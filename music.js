(()=>{
'use strict';
const KEY='pheem.music.v1';
const tracks=(window.PHEEM_MUSIC_TRACKS||[]).filter(t=>t.id&&t.src&&t.title);
let saved={};try{saved=JSON.parse(localStorage.getItem(KEY))||{}}catch{}
let index=Math.max(0,tracks.findIndex(t=>t.id===saved.trackId));
let volume=typeof saved.volume==='number'?Math.max(0,Math.min(1,saved.volume)):.45;
let enabled=saved.enabled!==false;
// Recover a song stopped by the previous play-once policy, preserving manual pause/off.
const wasCompleted=saved.playbackMode!=='loop'&&Array.isArray(saved.completed)&&saved.completed.includes(tracks[index]?.id);
let wanted=wasCompleted||saved.wanted!==false,interacted=false,blocked=false,failed=false,pending=false,attempt=0,lastSave=0;
let offset=!wasCompleted&&tracks[index]?.id===saved.trackId&&Number.isFinite(saved.time)?Math.max(0,saved.time):0;
let context=null,gain=null;
const phone=document.querySelector('#phone'),home=document.querySelector('#home');
const audio=document.createElement('audio');audio.id='background-music';audio.hidden=true;audio.loop=true;audio.preload='metadata';audio.setAttribute('aria-hidden','true');phone.append(audio);
const css=document.createElement('link');css.rel='stylesheet';css.href='music.css';document.head.append(css);
const svg=path=>'<svg viewBox="0 0 24 24" aria-hidden="true">'+path+'</svg>';
const icons={play:svg('<path d="m8 4 13 8-13 8z"/>'),pause:svg('<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>'),previous:svg('<path d="M3 5h3v14H3zM20 4v16L7 12z"/>'),next:svg('<path d="M18 5h3v14h-3zM4 4l13 8-13 8z"/>')};
function save(){try{localStorage.setItem(KEY,JSON.stringify({trackId:tracks[index]?.id||null,time:audio.readyState?audio.currentTime:offset,volume,wanted,enabled,playbackMode:'loop'}))}catch{}}
function setVolume(value){volume=Math.max(0,Math.min(1,value));if(gain)gain.gain.value=volume;else audio.volume=volume;save();render()}
function prepareAudio(){
 if(!context){try{const Context=window.AudioContext||window.webkitAudioContext;context=new Context();gain=context.createGain();context.createMediaElementSource(audio).connect(gain);gain.connect(context.destination);gain.gain.value=volume;audio.volume=1}catch{context=null;gain=null;audio.volume=volume}}
 if(context?.state==='suspended')context.resume().catch(()=>{})
}
function render(){
 const track=tracks[index],playing=!audio.paused&&!audio.ended&&!blocked;
 for(const w of widgets){w.title.textContent=track?.title||'Music';w.artist.textContent=!enabled?'音乐已关闭':track?.artist||(!track?'暂无歌曲':'');if(track?.cover){if(w.art.dataset.src!==track.cover){const image=document.createElement('img');image.src=track.cover;image.alt='';w.art.replaceChildren(image);w.art.dataset.src=track.cover}}else{w.art.textContent='♪';delete w.art.dataset.src}w.play.innerHTML=playing?icons.pause:icons.play;w.play.setAttribute('aria-label',w.label+(playing?'暂停音乐':'播放音乐'));w.play.setAttribute('aria-pressed',String(playing));w.play.disabled=!track||blocked||!enabled;w.previous.disabled=w.next.disabled=blocked||!enabled||tracks.length<2;w.power.setAttribute('aria-label',w.label+(enabled?'关闭音乐':'开启音乐'));w.power.setAttribute('aria-pressed',String(enabled));w.power.disabled=!track;w.volume.disabled=!track;w.volume.value=String(volume);w.error.hidden=!failed;const duration=Number.isFinite(audio.duration)?audio.duration:0;const time=audio.readyState?audio.currentTime:offset;w.progress.max=duration||1;w.progress.value=Math.min(time,duration);w.elapsed.textContent=formatTime(time);w.remaining.textContent=duration?'−'+formatTime(Math.max(0,duration-time)):'−0:00'}
}
function formatTime(time){return Math.floor(time/60)+':'+String(Math.floor(time%60)).padStart(2,'0')}
function tryPlay(){
 if(!interacted||!wanted||!enabled||blocked||!tracks[index]||failed||pending)return;
 prepareAudio();const token=++attempt;pending=true;
 // Call play in the original trusted gesture, without waiting for AudioContext.resume.
 const playback=audio.play();render();playback.then(()=>{if(token!==attempt)return;pending=false;if(blocked||!wanted||!enabled)audio.pause();render()}).catch(error=>{if(token!==attempt)return;pending=false;if(error.name!=='AbortError'&&error.name!=='NotAllowedError')failed=true;render()})
}
function select(next){
 if(!tracks.length||blocked||!enabled)return;
 const target=(next+tracks.length)%tracks.length;
 attempt++;pending=false;failed=false;audio.pause();index=target;offset=0;audio.src=tracks[index].src;audio.load();save();render();tryPlay()
}
function toggle(){interacted=true;if(blocked||!enabled||!tracks[index])return;if(!audio.paused){wanted=false;attempt++;pending=false;audio.pause();save();render()}else{wanted=true;failed=false;if(audio.error)audio.load();save();tryPlay()}}
function makeWidget(parent,label){
 const box=document.createElement('section');box.className='music-widget';box.setAttribute('aria-label',label+'音乐播放器');
 box.innerHTML='<div class="music-info"><div class="music-art" aria-hidden="true">♪</div><div class="music-copy"><div class="music-title"></div><div class="music-artist"></div></div></div><button type="button" class="music-power">⏻</button><div class="music-progress-row"><span class="music-elapsed">0:00</span><progress class="music-progress" value="0" max="1" aria-label="播放进度"></progress><span class="music-remaining">−0:00</span></div><div class="music-controls"><button type="button" class="music-previous"></button><button type="button" class="music-play"></button><button type="button" class="music-next"></button></div><div class="music-volume-row"><svg class="music-volume-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9h4l5-5v16l-5-5H3zM16 8q5 4 0 8M19 4q9 8 0 16"/></svg><input class="music-volume" type="range" min="0" max="1" step="0.01"></div><div class="music-error" hidden>暂时无法播放，请重试</div>';
 const w={box,label,art:box.querySelector('.music-art'),power:box.querySelector('.music-power'),progress:box.querySelector('.music-progress'),elapsed:box.querySelector('.music-elapsed'),remaining:box.querySelector('.music-remaining'),title:box.querySelector('.music-title'),artist:box.querySelector('.music-artist'),play:box.querySelector('.music-play'),previous:box.querySelector('.music-previous'),next:box.querySelector('.music-next'),volume:box.querySelector('.music-volume'),error:box.querySelector('.music-error')};
 w.power.onclick=()=>{interacted=true;enabled=!enabled;attempt++;pending=false;if(!enabled)audio.pause();save();render();if(enabled)tryPlay()};
 w.previous.innerHTML=icons.previous;w.next.innerHTML=icons.next;w.previous.setAttribute('aria-label',label+'上一首');w.next.setAttribute('aria-label',label+'下一首');w.volume.setAttribute('aria-label',label+'音乐音量');w.play.onclick=toggle;w.previous.onclick=()=>{interacted=true;select(index-1)};w.next.onclick=()=>{interacted=true;select(index+1)};w.volume.oninput=()=>setVolume(Number(w.volume.value));
 // Music sliders/buttons must not be mistaken for the lock screen's swipe gesture.
 for(const event of ['pointerdown','pointerup','pointercancel','wheel','keydown'])box.addEventListener(event,e=>e.stopPropagation());
 parent.append(box);return w
}
const widgets=[makeWidget(document.querySelector('#lock'),'锁屏'),makeWidget(home,'主页')];home.classList.add('music-enabled');
const icon=document.querySelector('.app-hit[aria-label="Music"]');if(icon)icon.onclick=()=>widgets[1].play.focus({preventScroll:true});
function gesture(e){if(!e.isTrusted||e.target.closest('.music-widget'))return;if(e.type==='keydown'&&!['Enter',' ','ArrowUp'].includes(e.key))return;interacted=true;tryPlay()}
phone.addEventListener('pointerdown',gesture,true);phone.addEventListener('keydown',gesture,true);
window.addEventListener('phone:call-state',e=>{
 blocked=!!e.detail.active;
 if(blocked){attempt++;pending=false;audio.pause();save();render()}else{render();tryPlay()}
});
audio.addEventListener('loadedmetadata',()=>{render();if(offset){audio.currentTime=Math.min(offset,Math.max(0,audio.duration-.1));offset=0}});
for(const event of ['playing','pause','error'])audio.addEventListener(event,()=>{if(event==='error')failed=true;render();if(event==='pause')save()});
// Native looping repeats the current song; manual pause/off and call interruption still win.

audio.addEventListener('timeupdate',()=>{render();if(Date.now()-lastSave>=5000){lastSave=Date.now();save()}});
window.addEventListener('pagehide',()=>{save();audio.pause()});
if(tracks.length){audio.volume=volume;audio.src=tracks[index].src;audio.load()}render();
})();
