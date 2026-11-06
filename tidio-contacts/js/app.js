(() => {
  'use strict';
  const data = window.TIDIO_COUNTRIES;
  const board = document.getElementById('treemap');
  if (!data || !board) return;
  const rows = data.countries.map(c => ({...c,keyword:c.zh,volume:c.count}));
  const $ = id => document.getElementById(id);
  const format = n => new Intl.NumberFormat('en-US').format(n);
  $('top-volume').textContent = format(data.top100Records);
  $('top-count').textContent = format(rows.length);
  const colors = ['#4795f8','#668ef8','#857cf4','#9985f5','#ad96f7','#c0aff9','#cfc5fb','#dcd7fc'];
  const state = {query:'', tiles:[]};
  const tooltip = $('tooltip');
  let focusedTile = null;

  function layout(items, width, height) {
    // Squarified treemap: rows of balanced rectangles, preserving area proportionality.
    const total = items.reduce((a,b)=>a+b.volume,0);
    if (!total) return [];
    const available = {x:0,y:0,w:width,h:height};
    const queue = items.map(d => ({...d,area:d.volume/total*width*height}));
    const result=[];
    const score=(row,side) => {
      if (!row.length) return Infinity;
      const areas=row.map(i=>i.area), sum=areas.reduce((a,b)=>a+b,0);
      if(!sum)return Infinity;
      const min=Math.min(...areas),max=Math.max(...areas);
      return Math.max((side*side*max)/(sum*sum),(sum*sum)/(side*side*min));
    };
    while(queue.length && available.w>0 && available.h>0){
      const row=[];const side=Math.min(available.w,available.h);
      while(queue.length){
        if(!row.length || score([...row,queue[0]],side)<=score(row,side))row.push(queue.shift());
        else break;
      }
      const sum=row.reduce((a,b)=>a+b.area,0);
      if(available.w>=available.h){
        const rowW=Math.min(available.w,sum/available.h);let y=available.y;
        row.forEach((d,i)=>{const h=i===row.length-1?available.y+available.h-y:d.area/rowW;result.push({...d,x:available.x,y,w:rowW,h});y+=h});
        available.x+=rowW;available.w=Math.max(0,available.w-rowW);
      }else{
        const rowH=Math.min(available.h,sum/available.w);let x=available.x;
        row.forEach((d,i)=>{const w=i===row.length-1?available.x+available.w-x:d.area/rowH;result.push({...d,x,y:available.y,w,h:rowH});x+=w});
        available.y+=rowH;available.h=Math.max(0,available.h-rowH);
      }
    }
    return result;
  }
  function putTooltip(tile, x, y) {
    $('tip-keyword').textContent=tile.zh;
    $('tip-en').textContent=tile.en;
    $('tip-share').textContent=tile.percent.toFixed(2)+'%';
    $('tip-volume').textContent=format(tile.volume);
    tooltip.classList.add('visible');tooltip.setAttribute('aria-hidden','false');
    const pad=13,tw=tooltip.offsetWidth,th=tooltip.offsetHeight;
    const left=Math.max(pad,Math.min(innerWidth-tw-pad,x+15));
    const top=Math.max(pad,Math.min(innerHeight-th-pad,y+17));
    tooltip.style.left=`${left}px`;tooltip.style.top=`${top}px`;
  }
  function hideTooltip(){tooltip.classList.remove('visible');tooltip.setAttribute('aria-hidden','true')}
  function render(){
    hideTooltip();
    const filtered=rows.filter(x=>(x.zh+' '+x.en).toLocaleLowerCase().includes(state.query));
    $('visible-count').textContent=`当前显示 ${filtered.length} / ${rows.length} 个国家或地区`;
    board.replaceChildren();
    if(!filtered.length){const el=document.createElement('div');el.className='empty';el.textContent='没有找到匹配的国家或地区，请尝试其他搜索内容。';board.append(el);return;}
    const width=board.clientWidth,height=board.clientHeight;
    const positions=layout(filtered,width,height);
    const fragment=document.createDocumentFragment();
    for(const [i,d] of positions.entries()){
      const el=document.createElement('button');el.type='button';el.className='tile';
      el.style.left=`${d.x/width*100}%`;el.style.top=`${d.y/height*100}%`;
      el.style.width=`${d.w/width*100}%`;el.style.height=`${d.h/height*100}%`;
      el.style.background=colors[Math.min(colors.length-1,Math.floor(i/Math.max(filtered.length/8,1)))];
      el.style.color=i<Math.ceil(filtered.length*.27)?'#fff':'#243252';
      const area=d.w*d.h;
      if(d.w<73||d.h<42||area<4000) el.classList.add('tiny');
      else if(d.w<130||d.h<75)el.classList.add('small');
      const title=document.createElement('span');title.className='tile-title';title.textContent=d.zh;
      const value=document.createElement('span');value.className='tile-value';value.textContent=format(d.volume);
      el.append(title,value);
      el.setAttribute('aria-label',`${d.zh}，联系人记录数 ${format(d.volume)}。点击复制国家名称`);
      el.title=`${d.zh} · ${format(d.volume)} / 月`;
      el.addEventListener('pointerenter',e=>{focusedTile=el;putTooltip(d,e.clientX,e.clientY)});
      el.addEventListener('pointermove',e=>putTooltip(d,e.clientX,e.clientY));
      el.addEventListener('pointerleave',()=>{focusedTile=null;hideTooltip()});
      el.addEventListener('focus',()=>{const b=el.getBoundingClientRect();putTooltip(d,b.left+b.width/2,b.top+Math.min(b.height/2,40))});
      el.addEventListener('blur',hideTooltip);
      el.addEventListener('click',async()=>{
        // Clipboard optional; local file:/// and nonsecure contexts may deny permission.
        try {
          if(navigator.clipboard && window.isSecureContext){await navigator.clipboard.writeText(d.zh);$('status').textContent=`已复制：${d.zh}`;}
          else $('status').textContent=`国家：${d.zh}`;
        }catch{$('status').textContent=`国家：${d.zh}`;}
      });
      fragment.append(el);
    }
    board.append(fragment);
  }
  const search=$('keyword-search');
  search.addEventListener('input',e=>{state.query=e.target.value.trim().toLocaleLowerCase();render()});
  $('reset-search').addEventListener('click',()=>{search.value='';state.query='';$('status').textContent='';render();search.focus()});
  let sizeCheck=0;
  if(typeof ResizeObserver!=='undefined'){
    const observer=new ResizeObserver(()=>{cancelAnimationFrame(sizeCheck);sizeCheck=requestAnimationFrame(render)});observer.observe(board);
  }else window.addEventListener('resize',render);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')hideTooltip()});
  render();
})();
