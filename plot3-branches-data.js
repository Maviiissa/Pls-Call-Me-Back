(()=>{
const me=(...messages)=>({from:'me',messages}),parn=(...messages)=>({from:'parn',messages}),thanwa=(...messages)=>({from:'thanwa',messages});
window.PLOT3_BRANCHES={
 choices:[{id:'scarf',text:'你那条丝巾还在我这里。'},{id:'miss_you',text:'我想你了。'},{id:'cake',text:'蛋糕很好吃。'}],
 intro:['Parn，对不起……','你最近还好吗？'],
 scarf:[me('你那条丝巾还在我这里。','你什么时候来拿？'),parn('不用麻烦了，Khun Pheem。','您方便的话，交给前台就好。','我找时间让人去取。')],
 scarfDrafts:['我只是想见你。','那天的事情，对不起。'],
 miss_you:[me('我想你了。'),parn('Khun Pheem，您喝酒了吗？'),me('没有。'),parn('那您早点休息吧。'),me('你就这么不想跟我说话？'),parn('不是的。'),me('那为什么每次都想赶我走？'),parn('……是您让我走的。')],
 morningDrafts:['昨晚我不是只想……','我真的很想你。','Parn，我们重新开始吧。'],
 morning:[me('醒了？'),parn('醒了，Khun Pheem。'),me('昨晚睡得好吗？'),parn('嗯，谢谢您。'),me('你怎么又叫我Khun Pheem？'),parn('对不起。'),me('我不是让你道歉。'),parn('昨晚的事，您不用放在心上。'),me('什么意思？'),parn('我知道您只是偶尔会想起我。','我不会误会的。'),me('你觉得我是在玩你？'),parn('不是的。','我知道自己是什么身份。'),me('你到底什么意思？','我什么时候说过你不能向我要东西？'),parn('Khun Pheem。'),me('是我给你的钱不够吗？'),parn('……'),me('我不是那个意思。'),parn('我知道。','您一直都对我很好。','是我不应该想要更多。'),me('Parn。'),parn('我还要准备今天的订单。','先不打扰您了。')],
 cake:[me('蛋糕很好吃。'),parn('？','您来店里了吗？'),me('没有。','朋友买的。'),parn('这样啊☺️','谢谢您。'),me('……')],
 cakeDrafts:['其实是我买的。','我只是想帮你。','那天的事情，对不起。'],
 final:[thanwa('怎么样？','跟她说上话了吗？'),me('嗯。'),thanwa('她说什么了？'),me('……','没什么。'),thanwa('那你现在准备怎么办？'),me('我不知道。')]
};
})();
