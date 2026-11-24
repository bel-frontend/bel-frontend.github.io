/* Падказкі для тэрмінаў са слоўніка (glossary.js). Выкарыстоўваецца ў index.html і ГАЙД_AIF-C01.html */
(function(){
const $ = id => document.getElementById(id);
if(!$('gtip')){ const d=document.createElement('div'); d.id='gtip'; document.body.prepend(d); }
/* ===== Слоўнік і падказкі ===== */
const G = window.GLOSSARY || [];
const gMap = {}; const gAliases=[];
G.forEach((e,i)=>e[0].forEach(a=>{ const k=a.toLowerCase(); if(!(k in gMap)){gMap[k]=i; gAliases.push(a);} }));
gAliases.sort((a,b)=>b.length-a.length);
const esc = s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const gRe = new RegExp('(?<![\\p{L}\\p{N}])('+gAliases.map(esc).join('|')+')[\\p{L}]*','giu');
function linkTerms(root){
  if(!root) return;
  const used=new Set(); const nodes=[];
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{
    const p=n.parentElement; if(!p) return NodeFilter.FILTER_REJECT;
    if(p.closest('a,code,pre,button,script,style,svg,.term,h2,input,label,.side,.badge')) return NodeFilter.FILTER_REJECT;
    return n.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;}});
  while(w.nextNode()) nodes.push(w.currentNode);
  nodes.forEach(n=>{
    const t=n.nodeValue; gRe.lastIndex=0; let m, last=0, frag=null;
    while((m=gRe.exec(t))){
      const idx=gMap[m[1].toLowerCase()]; if(idx===undefined) continue;
      frag=frag||document.createDocumentFragment();
      frag.appendChild(document.createTextNode(t.slice(last,m.index)));
      const sp=document.createElement('span'); sp.className='term'; sp.dataset.g=idx; sp.textContent=m[0]; frag.appendChild(sp);
      last=m.index+m[0].length;
    }
    if(frag){ frag.appendChild(document.createTextNode(t.slice(last))); n.replaceWith(frag); }
  });
}
const gtip=$('gtip');
function showTip(el){
  const e=G[+el.dataset.g]; gtip.innerHTML=e[2]+`<div class="gn">${e[1]} · ${e[0].join(', ')}</div>`;
  gtip.style.display='block'; const r=el.getBoundingClientRect(), tw=gtip.offsetWidth, th=gtip.offsetHeight;
  let x=Math.min(Math.max(8,r.left), innerWidth-tw-8), y=r.bottom+6; if(y+th>innerHeight-8) y=r.top-th-6;
  gtip.style.left=x+'px'; gtip.style.top=y+'px';
}
document.addEventListener('mouseover',e=>{const t=e.target.closest('.term'); if(t) showTip(t);});
document.addEventListener('mouseout',e=>{if(e.target.closest('.term')) gtip.style.display='none';});
document.addEventListener('click',e=>{const t=e.target.closest('.term'); if(t){e.stopPropagation(); showTip(t);} else gtip.style.display='none';},true);

window.G=G; window.linkTerms=linkTerms; window.showTip=showTip;
})();
