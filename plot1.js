(()=>{
'use strict';
// Set false for release: restore saved progress instead of restarting on refresh.
const TEST_MODE=true;
const EXPLORATION_DELAY_MS=20000;
const KEY=TEST_MODE?'pheem.plot1.test.v1':'pheem.plot1.v1';
if(TEST_MODE)localStorage.removeItem(KEY);
let s;try{s=JSON.parse(localStorage.getItem(KEY))}catch{};
s=s||{state:'plot1_exploration',startedAt:null,messages:[],queue:[],step:0,unread:false,callElapsed:0};
const save=()=>localStorage.setItem(KEY,JSON.stringify(s));
const state=x=>{s.state=x;save()};
const el=(tag,cls,text)=>{const n=document.createElement(tag);n.className=cls;if(text!==undefined)n.textContent=text;return n};
const css=el('link','');css.rel='stylesheet';css.href='plot1.css';document.head.append(css);
const notification=el('button','plot-notification');notification.hidden=true;notification.setAttribute('aria-label','打开Thanwa的新LINE消息');phone.append(notification);
const input=lineApp.querySelector('.line-compose-input');input.setAttribute('role','button');input.tabIndex=0;input.setAttribute('aria-label','填入预设回复');
const oldSend=lineApp.querySelector('.line-send-icon');const send=el('button','line-icon plot-send','➤');send.setAttribute('aria-label','发送预设回复');oldSend.replaceWith(send);
const typing=el('small','plot-typing','正在输入……');typing.hidden=true;document.querySelector('#line-chat-tools').append(typing);
let draft='',draftContact='';
const beforeContact=['我找秘书问Techin电话','我自己去问他'];
const beforeContactSent=()=>s.messages.filter(m=>m.id.startsWith('player-before-contact-')).length;
const follow=['……是我误会了。','我去问了Techin。','还能怎么办。','Techin给了我她蛋糕店的地址和FB','你帮我群里说一声，明天请大家吃蛋糕','不许有任何人拒绝'];
function preset(){if(s.queue.length)return '';if(currentLineContact==='thanwa'){
 if(s.state==='plot1_thanwa_notification')return '？？';
 if(s.state==='plot1_thanwa_replied')return beforeContact[beforeContactSent()]||'';
 if(['plot1_call_completed','plot1_thanwa_followup'].includes(s.state))return follow[s.step]||'';
 }if(currentLineContact==='secretary'&&s.state==='plot1_thanwa_replied'&&beforeContactSent()===beforeContact.length)return '把Techin的电话给我';return ''}
function compose(){draft='';input.textContent=preset()?'点击输入回复':'Aa';send.disabled=true;}
function fill(){draft=preset();draftContact=currentLineContact;if(draft){input.textContent=draft;send.disabled=false}}
input.onclick=fill;input.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fill()}};
function visible(c){return lineApp.classList.contains('open')&&!lineChat.hidden&&currentLineContact===c}
function renderExtra(c){
 for(const n of lineHistory.querySelectorAll('[data-plot1]'))n.remove();let date='';
 for(const m of s.messages.filter(m=>m.contact===c)){
 if(m.date!==date){const d=el('div','line-date',m.date);d.dataset.plot1='';lineHistory.append(d);date=m.date}
 const row=el('div','line-row '+(m.me?'me':c));row.dataset.plot1=m.id;
 if(!m.me){const a=el('img','line-avatar');a.src=c==='thanwa'?'assets/thanwa-line-avatar.jpg':'assets/secretary-line-avatar.jpg';a.alt='';row.append(a)}
 const bubble=el('div','line-bubble');
 if(m.card){bubble.classList.add('plot-contact');bubble.append(el('strong','','Khun Techin'),el('div','','+66 33 222 1166'));const b=el('button','','拨打电话');b.disabled=s.callDone;b.onclick=startCall;bubble.append(b)}else bubble.textContent=m.text;
 const meta=el('div','line-meta',m.me?'Read':'20:35');if(m.me)row.append(meta,bubble);else row.append(bubble,meta);lineHistory.append(row)
 }
 typing.hidden=!(visible(c)&&s.queue[0]?.typing&&s.queue[0]?.contact===c);compose();
}
const originalRender=renderLineHistory;renderLineHistory=function(c){originalRender(c);renderExtra(c)};
const originalOpen=openLineChat;openLineChat=function(c){originalOpen(c);if(s.unreadCounts)s.unreadCounts[c]=0;save();if(c==='thanwa'&&s.unread){s.unread=false;save()}updateNotification();compose()};
function updateChatList(){
 s.unreadCounts=s.unreadCounts||{};
 const contacts=['thanwa','secretary'];
 for(const c of contacts){
  const row=document.querySelector('#line-'+c),last=s.messages.filter(m=>m.contact===c).at(-1);
  if(!last)continue;
  row.querySelector('.line-contact-copy p').textContent=last.card?'[联系人] Khun Techin':last.text;
  row.querySelector('time').textContent=last.date.includes('26日')?'26 Jun':'20:35';
  let badge=row.querySelector('.plot-unread-count');if(!badge){badge=el('span','plot-unread-count');row.append(badge)}
  const count=s.unreadCounts[c]||0;badge.textContent=String(count);badge.hidden=!count;
  row.setAttribute('aria-label',row.querySelector('strong').textContent+'，'+(last.card?'联系人卡片':last.text)+(count?'，'+count+'条未读':''));
 }
 // Move the most recently active conversations above the unchanged historical rows.
 const order=[...contacts].filter(c=>s.messages.some(m=>m.contact===c)).sort((a,b)=>s.messages.findLastIndex(m=>m.contact===b)-s.messages.findLastIndex(m=>m.contact===a));
 for(const c of order.reverse()){const row=document.querySelector('#line-'+c),first=lineList.querySelector('.line-contact');if(row!==first)lineList.insertBefore(row,first)}
}
function updateNotification(){updateChatList();notification.hidden=!s.unread||visible('thanwa');notification.textContent='LINE · Thanwa\n'+(s.messages.filter(m=>m.contact==='thanwa'&&!m.me).at(-1)?.text||'新消息');document.querySelector('#line-thanwa').classList.toggle('plot-unread',s.unread)}
notification.onclick=()=>{if(!phone.classList.contains('unlocked'))unlock();for(const id of ['facebook','photos-app']){const n=document.getElementById(id);n?.classList.remove('open');if(n&&id==='facebook')n.inert=true}openLine();openLineChat('thanwa')};
function add(m){if(!s.messages.some(x=>x.id===m.id)){s.messages.push(m);if(!m.me&&!visible(m.contact)){s.unreadCounts=s.unreadCounts||{};s.unreadCounts[m.contact]=(s.unreadCounts[m.contact]||0)+1}}if(m.contact==='thanwa'&&!m.me&&!visible('thanwa'))s.unread=true;save();if(visible(m.contact)){renderLineHistory(m.contact);lineHistory.scrollTop=lineHistory.scrollHeight}updateNotification()}
function schedule(contact,texts,delay,done,typing=false){const base=Date.now()+delay;s.queue=texts.map((text,i)=>({id:done+'-'+i,contact,text,due:base+i*1000,typing,done:i===texts.length-1?done:null}));save();compose()}
function process(){
 if(s.startedAt&&s.state==='plot1_exploration'&&Date.now()-s.startedAt>=EXPLORATION_DELAY_MS){state('plot1_thanwa_notification');schedule('thanwa',['？','Techin？','他不是Gay吗？'],0,'intro')}
 while(s.queue.length&&Date.now()>=s.queue[0].due){const m=s.queue.shift();add({...m,date:'2026年6月25日 20:35',card:m.text==='@contact'});if(m.done==='explanation')state('plot1_thanwa_replied');if(m.done==='contact')state('plot1_secretary_contact');if(!s.queue.length)compose()}
 typing.hidden=!(visible(currentLineContact)&&s.queue[0]?.contact===currentLineContact&&s.queue[0]?.typing&&Date.now()>=s.queue[0].due-1000);updateNotification();
}
new MutationObserver(()=>{if(phone.classList.contains('unlocked')&&!s.startedAt){s.startedAt=Date.now();save()}}).observe(phone,{attributes:true,attributeFilter:['class']});
const originalUnlock=unlock;unlock=function(){originalUnlock();if(!s.startedAt){s.startedAt=Date.now();save()}};
send.onclick=()=>{if(!draft||draftContact!==currentLineContact||draft!==preset())return;const c=currentLineContact,text=draft;
 const isBeforeContact=c==='thanwa'&&s.state==='plot1_thanwa_replied';
 const isFollow=c==='thanwa'&&['plot1_call_completed','plot1_thanwa_followup'].includes(s.state);
 add({id:'player-'+(isBeforeContact?'before-contact-'+beforeContactSent():isFollow?'follow-'+s.step:c),contact:c,text,me:true,date:isFollow?'2026年6月26日 11:26':'2026年6月25日 20:35'});
 if(c==='secretary'){state('plot1_secretary_contact');schedule(c,['好的，Khun Phakinee。请稍等。','@contact'],3000,'contact');s.queue[1].due+=1000;save()}
 else if(isBeforeContact){save()}
 else if(!isFollow){schedule(c,['你没看Techin和那个Wang的官宣吗？','他俩在一起了啊','Parn怎么可能喜欢他？','你是不是误会什么了？'],4000,'explanation',true);s.typingAt=Date.now()+3000;save()}
 else{s.step++;state(s.step===6?'plot1_completed':'plot1_thanwa_followup');if(s.step===2){schedule(c,['我就说吧！','那你现在打算怎么办？'],1000,'follow');s.queue.forEach(m=>m.follow=true);save()}}
 compose();
};
// Keep the next-day date with follow-up messages without altering the historical arrays.
const baseAdd=add;add=function(m){if(m.follow)m.date='2026年6月26日 11:26';baseAdd(m)};
const call=el('section','plot-call');call.hidden=true;call.setAttribute('role','dialog');call.setAttribute('aria-modal','true');call.setAttribute('aria-label','与Techin的模拟通话');
call.innerHTML='<div class="plot-call-head"><div class="plot-call-status">Calling…</div><h1>+66 33 222 1166</h1><p>Thailand</p></div><div class="plot-subtitle" aria-live="polite"></div><div class="plot-controls"></div><div class="plot-call-home"></div>';phone.append(call);
const icons={Speaker:'<path d="M3 9h4l5-5v16l-5-5H3zM16 8q5 4 0 8M19 4q9 8 0 16"/>',FaceTime:'<rect x="2" y="6" width="13" height="13" rx="3"/><path d="m15 10 7-4v13l-7-4"/>',Mute:'<rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 10v3a7 7 0 0 0 14 0M12 20v3M2 2l20 20"/>',More:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',End:'<path d="M3 14q9-9 18 0l-2 4-5-2v-3h-4v3l-5 2z"/>',Keypad:'<rect x="4" y="3" width="16" height="19" rx="2"/><path d="M4 9h16M4 15h16M10 3v19M15 3v19"/>'};
for(const name of Object.keys(icons)){const b=el('button','plot-control '+(name==='End'?'end':''));b.innerHTML='<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">'+icons[name]+'</svg></span>'+name;b.setAttribute('aria-label',name);if(name==='End')b.onclick=()=>endCall(false);else if(['Speaker','Mute'].includes(name)){b.setAttribute('aria-pressed','false');b.onclick=()=>b.setAttribute('aria-pressed',String(b.getAttribute('aria-pressed')!=='true'))}else b.disabled=true;call.querySelector('.plot-controls').append(b)}
const subtitle=call.querySelector('.plot-subtitle'),status=call.querySelector('.plot-call-status');
// One complete recording. The audio element is the sole subtitle clock.
const voicePlayer=new Audio();voicePlayer.preload='auto';
const retryAudio=el('button','plot-audio-retry','播放通话声音');retryAudio.hidden=true;call.querySelector('.plot-call-head').append(retryAudio);
let callStart=0,callTimer,ending=false,activeId='',audioContext,voiceStarted=false,voiceEndedAt=null,prime=Promise.resolve(),resumeOffset=0;
function clearCaption(){activeId='';subtitle.textContent='';subtitle.classList.remove('visible')}
function clearAudio(){voicePlayer.pause();retryAudio.hidden=true;clearCaption()}
function playVoice(){return voicePlayer.play().then(()=>{retryAudio.hidden=true}).catch(()=>{if(!ending&&!call.hidden)retryAudio.hidden=false})}
retryAudio.onclick=()=>{audioContext?.resume();playVoice()};
voicePlayer.onpause=()=>{clearCaption()};
voicePlayer.onended=()=>{clearCaption();voiceEndedAt=performance.now();beep()};
function startCall(resume=false){if(s.callDone||!call.hidden)return;call.hidden=false;lineApp.inert=true;ending=false;activeId='';voiceStarted=false;voiceEndedAt=null;retryAudio.hidden=true;
 try{audioContext=new(window.AudioContext||window.webkitAudioContext)();audioContext.resume()}catch{};call.querySelector('.end').focus();
 voicePlayer.src=window.PLOT1_CALL_AUDIO;voicePlayer.volume=0;
 // Unlock this same media element during the contact-button gesture on iOS.
 prime=voicePlayer.play().then(()=>{voicePlayer.pause();voicePlayer.currentTime=0;voicePlayer.volume=1}).catch(()=>{voicePlayer.volume=1});
 if(!resume){s.callElapsed=0;state('plot1_calling')}
 resumeOffset=Math.max(0,s.callElapsed-3);callStart=performance.now()-Math.min(s.callElapsed,3)*1000;callTimer=setInterval(tickCall,33);tickCall()
}
function beep(){if(!audioContext)return;for(let i=0;i<3;i++){const o=audioContext.createOscillator(),g=audioContext.createGain();o.frequency.value=480;g.gain.value=.04;o.connect(g);g.connect(audioContext.destination);const t=audioContext.currentTime+i*.45;o.start(t);o.stop(t+.22)}}
function tickCall(){if(ending)return;
 if((performance.now()-callStart)/1000<3){s.callElapsed=(performance.now()-callStart)/1000;save();status.textContent='Calling…';return}
 if(!voiceStarted){voiceStarted=true;state('plot1_in_call');prime.then(()=>{if(ending||call.hidden)return;voicePlayer.currentTime=resumeOffset;playVoice()})}
 call.querySelector('h1').textContent='Techin';call.querySelector('p').textContent='mobile · Thailand';
 const time=voicePlayer.currentTime,sec=Math.floor(time);s.callElapsed=3+time;save();status.textContent=String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0');
 if(voiceEndedAt!==null){if(performance.now()-voiceEndedAt>=2300)endCall(true);return}
 if(voicePlayer.paused){clearCaption();return}
 const cue=window.PLOT1_SUBTITLES.find(c=>time>=c.startTime&&time<c.endTime);
 if((cue?.id||'')!==activeId){clearCaption();if(cue){activeId=cue.id;subtitle.textContent=cue.text;subtitle.classList.add('visible')}}
}
function endCall(complete){if(ending)return;ending=true;clearInterval(callTimer);clearAudio();audioContext?.close();status.textContent='Call Ended';if(complete){s.callDone=true;state('plot1_call_completed')}else{s.callElapsed=0;state('plot1_secretary_contact')}
 setTimeout(()=>{call.hidden=true;lineApp.inert=false;openLine();openLineChat('secretary');call.querySelector('h1').textContent='+66 33 222 1166';call.querySelector('p').textContent='Thailand';},1000)}
window.addEventListener('keydown',e=>{if(!call.hidden&&e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation()}},true);
window.addEventListener('pagehide',()=>{save();clearAudio()});
// Return buttons reuse the existing phone navigation; pending messages stay in storage.
setInterval(process,200);process();compose();if(['plot1_calling','plot1_in_call'].includes(s.state))startCall(true);
})();
