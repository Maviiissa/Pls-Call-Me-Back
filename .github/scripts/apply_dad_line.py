import json
from pathlib import Path
path=Path('index.html')
html=path.read_text(encoding='utf-8')
def replace_once(old,new,tag):
    global html
    count=html.count(old)
    if count!=1:
        raise RuntimeError(f'{tag}: expected once, found {count}')
    html=html.replace(old,new,1)
sessions=[
 ('2026年5月19日','10:15',[
  ('dad','明天上午十点，来我办公室一趟。'),
  ('dad','Songsak已经和我们的竞争对手签约了。'),
  ('dad','你不是和我保证过，会把这件事情处理好吗？'),
  ('me','是我的失误。'),
  ('dad','是因为那个女人对吧？你把她带去见Songsak，然后呢？'),
  ('me','爸，昨晚那种局到底是什么性质您心里清楚，拿一个女人来换取合同，我做不到。'),
  ('dad','这不过是生意而已，Pheem。我们给他想要的东西，换取我们应得的利益。'),
  ('dad','如果是我认识的Pheem，肯定不会这样，你明天来和我解释清楚。')]),
 ('2026年5月26日','17:29',[
  ('me','爸，对不起，我不应该对您说那些话。'),
  ('me','但是Parn真的和别的人不一样，她和妈妈不一样。'),
  ('me','您能相信Pheem吗？'),
  ('dad','我不会干涉你和她交往'),
  ('dad','但是Pheem'),
  ('dad','你真的知道她是什么样的人吗？'),
  ('dad','你真的了解她吗？'),
  ('me','我了解她，我很爱她啊，爸。')]),
 ('2026年6月20日','18:30',[
  ('dad','今晚回家吃饭。我让阿姨做了你最喜欢的意面。'),
  ('me','我没胃口，爸。'),
  ('dad','Pat都跟我说了，你这段时间天天喝酒喝到半夜，文件也不签、会议也不参与，像什么样子？'),
  ('me','对不起……'),
  ('me','我会尽快调整的，不会耽误太久。'),
  ('dad','我只是希望你能变回以前的样子。'),
  ('dad','爸爸认真问你，你到底怎么了？'),
  ('me','爸….您说的是对的，我真的一点都不了解她。'),
  ('me','她也一样，妈妈也一样，她们都是一样的人。'),
  ('dad','好了，孩子，回家吃饭吧。')])]
dad_history=[{'date':d,'time':t,'messages':[{'sender':w,'text':m} for w,m in ms]} for d,t,ms in sessions]
replace_once('<button class="line-contact" id="line-thanwa">','<button class="line-contact" id="line-dad"><img class="line-avatar" src="assets/dad-line-avatar.jpg" alt="Dad 的头像"><span class="line-contact-copy"><strong>Dad</strong><p>好了，孩子，回家吃饭吧。</p></span><time>20 Jun</time></button><button class="line-contact" id="line-thanwa">','Dad list')
replace_once('<span class="line-icon" aria-hidden="true">☺</span></div></section></div><button class="line-home"','<span class="line-icon line-send-icon" role="img" aria-label="发送箭头"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 20.5 21 12 3.5 3.5l2.3 7.2 9 1.3-9 1.3z" fill="currentColor"/></svg></span></div></section></div><button class="line-home"','Send arrow')
replace_once('.line-home{position:absolute;','.line-send-icon{display:grid;place-items:center;color:#06c755;width:7cqw;height:7cqw;flex-shrink:0}.line-send-icon svg{display:block;width:5.5cqw;height:5.5cqw}.line-home{position:absolute;','Arrow style')
replace_once("const name = contact === 'thanwa' ? 'Thanwa' : 'Parn';","const name = contact === 'thanwa' ? 'Thanwa' : contact === 'dad' ? 'Dad' : 'Parn';",'Chat title')
replace_once("document.querySelector('#line-thanwa').onclick = () => openLineChat('thanwa');","document.querySelector('#line-thanwa').onclick = () => openLineChat('thanwa');\ndocument.querySelector('#line-dad').onclick = () => openLineChat('dad');",'Dad click')
replace_once('function renderLineHistory(contact) {','const DAD_HISTORY = '+json.dumps(dad_history,ensure_ascii=False,separators=(',',':'))+';\nfunction renderLineHistory(contact) {','Dad history')
replace_once("for (const session of contact === 'thanwa' ? THANWA_HISTORY : LINE_HISTORY) {","for (const session of contact === 'thanwa' ? THANWA_HISTORY : contact === 'dad' ? DAD_HISTORY : LINE_HISTORY) {",'History selection')
replace_once('date.textContent = session.date;',"date.textContent = contact === 'dad' ? session.date + ' ' + session.time : session.date;",'Dad timestamps')
replace_once("row.setAttribute('aria-label', outgoing ? 'ME' : (contact === 'thanwa' ? 'Thanwa' : 'Parn'));","row.setAttribute('aria-label', outgoing ? 'ME' : (contact === 'thanwa' ? 'Thanwa' : contact === 'dad' ? 'Dad' : 'Parn'));",'Message label')
replace_once("avatar.src = contact === 'thanwa' ? 'assets/thanwa-line-avatar.jpg' : lineAvatar;","avatar.src = contact === 'thanwa' ? 'assets/thanwa-line-avatar.jpg' : contact === 'dad' ? 'assets/dad-line-avatar.jpg' : lineAvatar;",'Dad message avatar')
assert sum(len(s['messages']) for s in dad_history)==26
path.write_text(html,encoding='utf-8')
print('Dad LINE chat patched, 3 dates, 26 messages')