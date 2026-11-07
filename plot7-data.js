// Final chapter dialogue and user-supplied image paths. No substitute photos.
(()=>{
const t=(...messages)=>({from:'thanwa',messages}),p=(...messages)=>({from:'parn',messages}),me=(...messages)=>({from:'me',messages});
window.PLOT7_DATA={
 lovePost:{id:'plot7-love',image:'assets/PheemIns2.jpg',caption:'Mine 😈',likes:0},
 weddingPost:{id:'plot7-wedding-ig',image:'assets/wedding.jpg',caption:'谢谢你爱我@ParnApsorn',date:'30 October 2026',likes:0},
 facebookPost:{id:'plot7-wedding-fb',date:'30 Oct',datetime:'2026-10-30',text:'🧡',images:[{src:'assets/wedding.jpg',alt:'Pheem与Parn的结婚照'}],likes:0,comments:0,shares:0},
 thanwa:[
 t('Yooooooo～','我没看错吧？？？','Phakinee居然在Instagram秀恩爱？？？','你以前不是最讨厌这种事吗？'),
 me('那是以前。'),
 t('哟。','现在不装了？'),
 me('嗯。','我爱她。','全世界我最爱Parn Apsorn','有什么不能让别人知道的？'),
 t('……','我真开了我的豆眼。','Parn到底对你施了什么魔法哈哈哈哈'),
 me({image:'assets/ring.jpg',alt:'戒指照片',viewLabel:'查看戒指照片',draft:'📷 ring.jpg'},'你觉得怎么样？'),
 t('？？？？？？？','等等。','你要干嘛？？？'),
 me('求婚。'),
 t('我去？？？','你认真的？？？'),
 me('从来没这么认真过。'),
 t('我的天。','我真的替你高兴。','你终于知道自己想要什么了。'),
 me('我一直都知道。','只是以前差点把她弄丢了。'),
 t('好啦，别煽情了。','她肯定会答应你的。'),
 me('那肯定的'),
 t('等等。','你准备怎么求婚？'),
 me({image:'assets/Haski.jpg',alt:'哈士奇服装照片',viewLabel:'查看哈士奇服装照片',draft:'📷 Haski.jpg'},'穿这个🫡'),
 t('……','PHEEM？？？？？','你认真的吗哈哈哈哈哈哈🤣'),
 me('她喜欢','她给我备注都是“西伯利亚哈士奇”','我是大狗🥱'),
 t('救命。','你真的完蛋了。','加油吧大狗🤣')
 ],
 proposal:[
 p('Pheem，什么时候回家～'),
 me('我来接你。','Parn，有一件很重要的事情。','我想先征求你的意见。'),
 p('什么事呀？'),
 me('跟我结婚吧。','从现在起，如果有人问你。','你就说是我老婆'),
 p('不见面和我说嘛？'),
 me('当然～我只是提前确认一下','一会儿见❤️'),
 p('一会儿见～')
 ]
};
})();
