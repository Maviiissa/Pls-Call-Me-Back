const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const URL=process.env.GAME_URL||'http://127.0.0.1:8000',KEY='pheem.plot1.v1';
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
 for(const branch of ['scarf','miss_you','cake']){
  const context=await browser.newContext();
  const inherited=branch==='miss_you'?'2026年6月29日 10:42':'2026年6月28日 15:34';
  const seed={persistentProgress:true,state:'plot3_completed',startedAt:1,queue:[],step:6,callDone:true,callElapsed:23,plot3_branch:branch,plot3_parn_call_completed:branch==='miss_you',messages:[{id:'plot3-s1-e0-0',contact:'thanwa',image:'assets/Cake.jpg',alt:'Thanwa发来的500份蛋糕照片',date:inherited},{id:'preserved-branch-'+branch,contact:'parn',me:true,text:'保留的分支记录',date:inherited},{id:'plot3-player-final-e5-0',contact:'thanwa',me:true,text:'我不知道。',date:inherited}],ui:{app:branch==='miss_you'?'line':'home',contact:'thanwa'},plot3:{scene:2,event:6,playerIndex:0,segment:'final',branch,completed:true,scene1Completed:true,postPublished:true,parnUnlocked:true,introCompleted:true,branchCompleted:true,currentDate:inherited,nodes:['plot3_completed']}};
  await context.addInitScript(({seed,key})=>{if(!sessionStorage.getItem('seed')){localStorage.setItem(key,JSON.stringify(seed));sessionStorage.setItem('seed','1')}},{seed,key:KEY});
  const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.clock.install();await p.goto(URL);
  const story=()=>p.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY),advance=ms=>p.clock.runFor(ms);
  const currentIs=async c=>(await p.locator('#line-app').isVisible())&&await p.evaluate(c=>currentLineContact===c&&!lineChat.hidden,c);
  async function openContact(c){if(await currentIs(c))return;const notice=p.locator('.plot-notification:not(.sms-notice)');if(await notice.isVisible()&&await notice.getAttribute('data-contact')===c){await notice.click();return}if(await p.locator('#line-app').isVisible()){if(await p.locator('#line-chat').isVisible())await p.locator('#line-back').click();await p.locator('#line-'+c).click();return}await p.getByRole('button',{name:'LINE',exact:true}).click();if(await p.locator('#line-chat').isVisible())await p.locator('#line-back').click();await p.locator('#line-'+c).click()}
  async function checkAvatars(c){assert.equal(await p.evaluate(c=>{const src=document.querySelector('#line-'+c+' .line-avatar').src;return [...document.querySelectorAll('#line-history .line-row:not(.me) .line-avatar')].every(a=>a.src===src)},c),true);assert.equal(await p.locator('#line-history [data-plot1].me .line-avatar').count(),0);assert.equal(await p.locator('#line-list .line-contact').count(),4)}
  async function send(text,c){await openContact(c);assert.equal(await p.locator('.line-compose-input').textContent(),'点击输入回复');await p.locator('.line-compose-input').click();assert.equal(await p.locator('.line-compose-input').textContent(),text);await p.getByRole('button',{name:'发送预设回复'}).click()}
  assert.equal((await story()).state,'plot4_started');assert.equal((await story()).messages.length,seed.messages.length);
  if(branch==='miss_you'){await advance(1000);assert.equal(await p.locator('#line-heading').textContent(),'正在输入....')}else{assert.equal(await p.locator('#line-app').isVisible(),false);await advance(1000)}
  await advance(1500);assert.equal((await story()).messages.length,seed.messages.length);await advance(800);await openContact('thanwa');assert.equal(await p.locator('#line-heading').textContent(),'Thanwa');await checkAvatars('thanwa');
  for(let scene=1;scene<=5;scene++){
   const turns=await p.evaluate(n=>PLOT4_DATA['scene'+n],scene),contact=scene===2||scene===3?'secretary':scene===5?'parn':'thanwa';
   // The initial incoming turn is delivered by this stage's transition wait.
   for(let i=1;i<turns.length;i++){
    const turn=turns[i];if(turn.from==='me'){for(const text of turn.messages)await send(text,contact)}
    else{
     await p.locator('.line-compose-input').click();assert.equal(await p.getByRole('button',{name:'发送预设回复'}).isDisabled(),true);
     if(scene===2&&i===2){await p.locator('.line-home').click();await p.getByRole('button',{name:'Instagram',exact:true}).click();await advance(1000);await p.reload();await advance(2400);assert.equal(await p.locator('#instagram-app').isVisible(),true);await p.locator('.plot-notification:not(.sms-notice)').click()}
     else await advance(3400+(turn.messages.length-1)*1000);
     await checkAvatars(contact)
    }
   }
   if(scene===1){await p.locator('.line-home').click();await p.getByRole('button',{name:'Instagram',exact:true}).click();await advance(3300);assert.equal(await p.locator('#instagram-app').isVisible(),true);assert.equal(await p.locator('.plot-notification:not(.sms-notice)').getAttribute('data-contact'),'secretary');await openContact('secretary');await checkAvatars('secretary')}
   if(scene===2){assert.equal((await story()).plot4.orderCompleted,true);assert.equal(await p.locator('.date').textContent(),'Tuesday, 30 June 2026');assert.equal(await p.locator('.time').textContent(),'14:26');await p.reload();assert.equal(await p.locator('.date').textContent(),'Tuesday, 30 June 2026');await advance(4500);await checkAvatars('secretary')}
   if(scene===3){const count=(await story()).messages.filter(m=>m.id.startsWith('plot4-s4')).length;await p.locator('.line-home').click();await p.getByRole('button',{name:'Photos',exact:true}).click();await advance(4500);assert.equal((await story()).messages.filter(m=>m.id.startsWith('plot4-s4')).length,count);await advance(800);assert.equal(await p.locator('#photos-app').isVisible(),true);await openContact('thanwa');await checkAvatars('thanwa')}
   if(scene===4){if(branch==='miss_you'){await p.getByRole('button',{name:'查看500份蛋糕照片'}).click();assert.equal(await p.locator('#line-viewer').isVisible(),true)}else{await p.locator('.line-home').click();await p.locator('.relock').click()}const count=(await story()).messages.filter(m=>m.id.startsWith('plot4-s5')).length;await advance(4500);assert.equal((await story()).messages.filter(m=>m.id.startsWith('plot4-s5')).length,count);await advance(800);assert.equal((await story()).messages.filter(m=>m.id.startsWith('plot4-s5')).length,1);if(branch!=='miss_you')assert.equal(await p.locator('#phone').evaluate(n=>n.classList.contains('unlocked')),false);await openContact('parn');assert.equal(await p.locator('#line-viewer').isVisible(),false);await advance(1000);assert.equal((await story()).messages.filter(m=>m.id.startsWith('plot4-s5')).length,2);await advance(1000);assert.equal((await story()).messages.filter(m=>m.id.startsWith('plot4-s5')).length,3);await checkAvatars('parn');assert.match(await p.locator('#line-history').textContent(),/我不想让你觉得/)}
  }
  assert.equal((await story()).state,'plot4_completed');assert.equal((await story()).plot4.completed,true);assert.equal((await story()).messages.at(-1).text,'不会再觉得我是一个为了钱骗您的人了。');assert.equal((await story()).plot3_branch,branch);assert.equal((await story()).messages.some(m=>m.id==='preserved-branch-'+branch),true);assert.equal((await story()).plot5,undefined);
  const expected=await p.evaluate(()=>[1,2,3,4,5].flatMap(n=>PLOT4_DATA['scene'+n].flatMap(t=>t.messages))),added=(await story()).messages.filter(m=>m.id.startsWith('plot4-'));
  assert.deepEqual(added.map(m=>m.text),expected);assert.equal(new Set(added.map(m=>m.id)).size,added.length);const count=(await story()).messages.length;
  await p.reload();await advance(20000);assert.equal((await story()).messages.length,count);assert.equal((await story()).state,'plot4_completed');assert.equal(await p.locator('.time').textContent(),'14:26');assert.equal(await p.locator('#line-heading').textContent(),'Parn');await p.locator('.line-compose-input').click();assert.equal(await p.getByRole('button',{name:'发送预设回复'}).isDisabled(),true);assert.deepEqual(errors,[]);
  console.log('PASS Plot4 after',branch,':',added.length,'bubbles, exact dialogue, three existing avatars, manual sending, 3s/5s waits, background notifications, lock/unlock, June30 clock, refresh retention, history/branch preserved, no replay');await context.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
