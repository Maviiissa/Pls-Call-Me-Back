/* Photos · Recently Deleted */
(()=>{
  const css=document.createElement('style');
  css.textContent=`
  .photos-app{position:absolute;inset:0;z-index:9;background:#f7f7fb;color:#171821;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;display:none;overflow:hidden;user-select:text}
  .photos-app.open{display:flex;flex-direction:column}.photos-app [hidden]{display:none!important}
  .photos-status{height:7%;min-height:26px;display:flex;align-items:center;justify-content:space-between;padding:0 6%;font-size:3.4cqw;font-weight:600}
  .photos-bar{display:flex;align-items:center;justify-content:space-between;padding:2% 5% 4%;gap:2%;border-bottom:1px solid #dedee4;min-height:12%}
  .photos-back,.photos-more{border:0;background:none;color:#087bdf;font-size:4cqw;padding:1.5%;cursor:pointer}
  .photos-bar h1{margin:0;font-size:5cqw;font-weight:700;flex:1;text-align:center}
  .photos-content{flex:1;overflow-y:auto;padding:6% 5%}
  .photos-heading{font-size:7cqw;letter-spacing:-.05em;margin:0 0 1%}
  .photos-description{font-size:3.3cqw;color:#777884;margin:0 0 7%;line-height:1.4}
  .photos-album{border:0;background:none;padding:0;text-align:left;display:block;width:48%;cursor:pointer;color:inherit}
  .photos-album-cover{aspect-ratio:1;border-radius:4cqw;overflow:hidden;background:#e4e5eb;position:relative}
  .photos-album-cover img{width:100%;height:100%;object-fit:cover;display:block}
  .photos-album-cover:after{content:'✕';position:absolute;right:8%;bottom:7%;font-size:4.5cqw;font-weight:700;border-radius:50%;background:#171821aa;color:white;padding:1% 3%}
  .photos-album-title{font-size:4cqw;font-weight:650;margin-top:3%}
  .photos-album-count{font-size:3.1cqw;color:#83848b;margin-top:1%}
  .photos-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.4cqw}
  .photos-tile{border:0;padding:0;aspect-ratio:1;background:#e2e3e6;cursor:pointer;overflow:hidden}
  .photos-tile img{width:100%;height:100%;object-fit:cover;display:block}
  .photos-viewer{position:absolute;inset:0;display:none;flex-direction:column;background:#101015;color:white;z-index:2}
  .photos-viewer.open{display:flex}
  .photos-viewer-top{height:13%;padding:7% 5% 2%;display:flex;justify-content:space-between;align-items:center;gap:3%}
  .photos-viewer-top button,.photos-viewer-bottom button{background:none;color:#fff;border:0;font-size:4cqw;cursor:pointer;padding:2%}
  .photos-viewer-counter{font-size:3.5cqw;color:#dadade}
  .photos-viewer-image{flex:1;display:flex;align-items:center;justify-content:center;min-height:0}
  .photos-viewer-image img{max-width:100%;max-height:100%;object-fit:contain}
  .photos-viewer-bottom{height:13%;display:flex;justify-content:space-around;align-items:center}
  .photos-home{height:5px;width:32%;margin:0 auto 3%;border-radius:99px;background:#a8a8ad}
  `;
  document.head.append(css);
  const imageNames=['photo1.jpg','photo2.jpg','photo3.jpg','photo4.jpg','photo5.jpg'];
  const images=imageNames.map(name=>'assets/'+name);
  const app=document.createElement('section');
  app.className='photos-app';app.id='photos-app';app.setAttribute('aria-label','Photos');
  app.innerHTML='<div class="photos-status"><span>23:15</span><span>● ▰ ▰</span></div><header class="photos-bar"><button class="photos-back" type="button">‹ Albums</button><h1>Photos</h1><button class="photos-more" aria-label="更多选项" type="button">•••</button></header><main class="photos-content"></main><section class="photos-viewer" role="dialog" aria-label="查看照片" aria-modal="true"><div class="photos-viewer-top"><button class="photos-close" type="button">‹ Back</button><span class="photos-viewer-counter"></span><button class="photos-more-view" type="button">•••</button></div><div class="photos-viewer-image"><img alt="最近删除的照片"></div><div class="photos-viewer-bottom"><button class="photos-prev" type="button" aria-label="上一张">‹</button><span>Recently Deleted</span><button class="photos-next" type="button" aria-label="下一张">›</button></div><div class="photos-home"></div></section><div class="photos-home"></div>';
  document.querySelector('#phone').append(app);
  const body=app.querySelector('.photos-content'),heading=app.querySelector('.photos-bar h1'),back=app.querySelector('.photos-back'),viewer=app.querySelector('.photos-viewer');
  let page='albums',selected=0;
  function open(){const home=document.querySelector('#home');home.inert=true;app.classList.add('open');page='albums';render();back.focus({preventScroll:true})}
  function close(){app.classList.remove('open');document.querySelector('#home').inert=false;document.querySelector('[aria-label="Photos"]').focus({preventScroll:true})}
  function render(){
    viewer.classList.remove('open');body.replaceChildren();
    if(page==='albums'){
      heading.textContent='Albums';back.textContent='‹ Home';
      body.innerHTML='<h2 class="photos-heading">Albums</h2><p class="photos-description">My Albums</p>';
      const button=document.createElement('button');button.type='button';button.className='photos-album';
      const cover=document.createElement('div');cover.className='photos-album-cover';
      const img=document.createElement('img');img.src=images[0];img.alt='Recently Deleted 相簿封面';cover.append(img);
      const title=document.createElement('div');title.className='photos-album-title';title.textContent='Recently Deleted';
      const count=document.createElement('div');count.className='photos-album-count';count.textContent='5 Photos';
      button.append(cover,title,count);button.onclick=()=>{page='deleted';render()};body.append(button);
    }else{
      heading.textContent='Recently Deleted';back.textContent='‹ Albums';
      body.innerHTML='<h2 class="photos-heading">Recently Deleted</h2><p class="photos-description">5 Photos</p>';
      const grid=document.createElement('div');grid.className='photos-grid';
      images.forEach((src,index)=>{const tile=document.createElement('button');tile.type='button';tile.className='photos-tile';tile.setAttribute('aria-label','查看第'+(index+1)+'张照片');const pic=document.createElement('img');pic.src=src;pic.alt='最近删除的照片 '+(index+1);tile.append(pic);tile.onclick=()=>showPhoto(index);grid.append(tile)});
      body.append(grid);
    }
  }
  function showPhoto(index){selected=(index+images.length)%images.length;viewer.classList.add('open');viewer.querySelector('img').src=images[selected];viewer.querySelector('.photos-viewer-counter').textContent=(selected+1)+' / '+images.length}
  back.onclick=()=>{if(page==='deleted'){page='albums';render()}else close()};
  app.querySelector('.photos-close').onclick=()=>viewer.classList.remove('open');
  app.querySelector('.photos-prev').onclick=()=>showPhoto(selected-1);
  app.querySelector('.photos-next').onclick=()=>showPhoto(selected+1);
  app.querySelector('.photos-more').onclick=()=>{};
  app.querySelector('.photos-more-view').onclick=()=>{};
  document.addEventListener('keydown',e=>{if(!app.classList.contains('open'))return;if(e.key==='Escape'){e.stopImmediatePropagation();if(viewer.classList.contains('open'))viewer.classList.remove('open');else if(page==='deleted'){page='albums';render()}else close()}else if(viewer.classList.contains('open')&&e.key==='ArrowLeft')showPhoto(selected-1);else if(viewer.classList.contains('open')&&e.key==='ArrowRight')showPhoto(selected+1)},true);
  const icon=document.querySelector('[aria-label="Photos"]');if(icon)icon.onclick=open;
})();
