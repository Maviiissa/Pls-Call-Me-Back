const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const URL=process.env.GAME_URL||'http://127.0.0.1:8000',KEY='pheem.plot1.v1';
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
 const errors=[];
 async function pageFor(seed,key=KEY){
  const context=await browser.newContext();
  if(seed)await context.addInitScript(({seed,key})=>{if(!sessionStorage.getItem('fixture')){localStorage.setItem(key,JSON.stringify(seed));sessionStorage.setItem('fixture','1')}},{seed,key});
  await context.addInitScript(()=>{const play=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){window.resumeAudio=this;return play.call(this)}});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.clock.install();await page.goto(URL);return page;
 }
 const read=p=>p.evaluate(key=>JSON.parse(localStorage.getItem(key)),KEY);
 const base={state:'plot1_exploration',startedAt:null,messages:[],queue:[],step:0,unread:false,callElapsed:0};
 // A refresh keeps the original exploration deadline; replies stay unique and pending.
 const p=await pageFor();await p.getByRole('button',{name:'Swipe up to unlock'}).click();await p.clock.runFor(10000);const started=(await read(p)).startedAt;
 await p.reload();assert.equal((await read(p)).startedAt,started);assert.equal(await p.locator('#phone').evaluate(n=>n.classList.contains('unlocked')),true);await p.clock.runFor(14000);assert.equal((await read(p)).messages.length,3);
 await p.getByRole('button',{name:'打开Thanwa的新LINE消息'}).click();await p.reload();assert.equal(await p.locator('#line-heading').textContent(),'Thanwa');assert.equal(await p.locator('.line-compose-input').textContent(),'点击输入回复');
 await p.locator('.line-compose-input').click();await p.getByRole('button',{name:'发送预设回复'}).click();await p.reload();await p.clock.runFor(8000);assert.equal((await read(p)).state,'plot1_thanwa_replied');assert.equal((await read(p)).messages.length,8);await p.reload();await p.clock.runFor(10000);assert.equal((await read(p)).messages.length,8);await p.context().close();
 // Existing test-mode progress migrates once, including Messenger order and date.
 const order={...base,state:'plot2_messenger_started',ui:{app:'facebook',chat:true},plot2:{lineStep:2,sms:[{id:'sms1',text:'Parn的店在这里。'},{id:'sms2',card:true}],smsQueue:[],orderStep:1,order:[{id:'order-player-0',text:'你好，订餐500份。',me:true}],orderQueue:[{id:'order-parn-0-0',text:'您好☺️，500份吗？？',due:0,typingAt:0},{id:'order-parn-0-1',text:'请问您需要什么款式呢？',due:0,typingAt:0}],nodes:[],unread:0,orderActive:true}};
 const q=await pageFor(order,'pheem.plot1.test.v1');assert.equal((await read(q)).persistentProgress,true);assert.equal(await q.evaluate(()=>localStorage.getItem('pheem.plot1.test.v1')),null);assert.equal(await q.locator('#chat-history .chat-row').count(),3);assert.equal(await q.locator('.time').textContent(),'14:12');await q.reload();assert.equal(await q.locator('#chat-history .chat-row').count(),3);await q.locator('.chat-input').click();assert.equal(await q.locator('.chat-input>span').first().textContent(),'都可以。');
 // A stale old tab writing the retired test key cannot roll back persistent progress.
 await q.evaluate(()=>localStorage.setItem('pheem.plot1.test.v1',JSON.stringify({state:'plot1_exploration',messages:[],queue:[]})));await q.reload();assert.equal((await read(q)).state,'plot2_messenger_started');await q.context().close();
 // Restore a selected branch and an already-published post from pre-persistence saves.
 const branch={...base,state:'plot3_parn_call_unlocked',callDone:true,plot3_branch:'miss_you',ui:{app:'line',contact:'parn'},plot3:{scene:2,event:8,playerIndex:0,scene1Completed:true,postPublished:true,parnUnlocked:true,introCompleted:true,segment:'miss_you',branch:'miss_you',parnCallReady:true,currentDate:'2026年6月28日 23:18',nodes:[]}};
 const r=await pageFor(branch);assert.equal(await r.locator('.time').textContent(),'23:18');assert.equal(await r.evaluate(()=>PHEEM_INSTAGRAM.posts.length),1);assert.equal(await r.getByRole('button',{name:'拨打Parn电话'}).isEnabled(),true);await r.reload();assert.equal((await read(r)).plot3_branch,'miss_you');assert.equal(await r.locator('.plot3-choices').isVisible(),false);assert.equal(await r.evaluate(()=>PHEEM_INSTAGRAM.posts.length),1);
 // In-progress draft animation resumes its frame rather than playing from the start.
 await r.context().close();
 const intro={...base,state:'plot3_parn_chat_unlocked',ui:{app:'line',contact:'parn'},plot3:{scene:2,event:4,playerIndex:0,scene1Completed:true,postPublished:true,parnUnlocked:true,nodes:[]}};
 const a=await pageFor(intro);await a.clock.runFor(2600);const before=(await read(a)).plot3.animation.index;assert(before>0);await a.reload();const resumedIndex=(await read(a)).plot3.animation.index;assert(resumedIndex>=before&&resumedIndex<=before+4);await a.clock.runFor(12000);assert.equal((await read(a)).plot3.introCompleted,true);assert.equal(await a.locator('.plot3-choices').isVisible(),true);await a.reload();assert.equal(await a.locator('.plot3-choices').isVisible(),true);assert.equal((await read(a)).plot3.animation,null);await a.context().close();
 // Both actual audio recordings restore their playback position; an ended call never replays.
 async function ensureAudio(page){await page.waitForTimeout(700);if(await page.locator('.plot-audio-retry').isVisible())await page.locator('.plot-audio-retry').click();await page.waitForTimeout(200)}
 for(const contact of ['techin','parn']){
  const fixture=contact==='parn'?{...branch,state:'plot3_parn_in_call',ui:{app:'call',contact},activeCall:{contact,audioEnded:false},plot3:{...branch.plot3,callElapsed:11}}:{...base,state:'plot1_in_call',callElapsed:9,ui:{app:'call',contact},activeCall:{contact,audioEnded:false}};
  const c=await pageFor(fixture);await ensureAudio(c);assert.equal(await c.locator('.plot-call h1').textContent(),contact==='parn'?'Parn':'Techin');assert(await c.evaluate(()=>resumeAudio.currentTime)>=(contact==='parn'?7.5:5.5));await c.clock.runFor(200);const elapsed=contact==='parn'?(await read(c)).plot3.callElapsed:(await read(c)).callElapsed;await c.reload();await ensureAudio(c);assert(await c.evaluate(()=>resumeAudio.currentTime)>=elapsed-3-.5);assert.equal((await read(c)).messages.length,0);await c.context().close();
 }
 const tail=await pageFor({...branch,state:'plot3_parn_in_call',ui:{app:'call',contact:'parn'},activeCall:{contact:'parn',audioEnded:true},plot3:{...branch.plot3,callElapsed:51.157}});await tail.clock.runFor(1400);assert.equal((await read(tail)).plot3_parn_call_completed,true);assert.equal(await tail.locator('.plot-call').isVisible(),false);assert.equal(await tail.locator('.line-compose-input').textContent(),'点击输入回复');await tail.reload();assert.equal(await tail.locator('#line-heading').textContent(),'Parn');assert.equal(await tail.locator('.line-compose-input').textContent(),'点击输入回复');await tail.context().close();
 // A fresh browser context has no inherited progress.
 const fresh=await pageFor();assert.equal((await read(fresh)).state,'plot1_exploration');assert.equal((await read(fresh)).messages.length,0);assert.equal(await fresh.getByRole('button',{name:'Swipe up to unlock'}).isVisible(),true);assert.equal(await fresh.evaluate(()=>PHEEM_INSTAGRAM.posts.length),0);assert.deepEqual(errors,[]);await browser.close();console.log('PASS persistence: exploration deadline, pending replies, no duplicates, test-save migration, order/date/UI restore, stale-key isolation, branch/post restore, animation resume, call playback resume, completed-call restore, fresh browser isolation');
})().catch(e=>{console.error(e);process.exit(1)});
