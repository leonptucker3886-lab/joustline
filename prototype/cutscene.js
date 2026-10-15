// Joustline cutscene engine: letterboxed canvas, captions, auto-advance, skip.
window.Cut=(function(){
const css='#cut{position:fixed;inset:0;z-index:50;background:#000;touch-action:none}#cut canvas{position:absolute;inset:0;width:100%;height:100%}#cap{position:absolute;left:0;right:0;bottom:12%;text-align:center;font:18px Georgia,serif;color:#f3e6c8;padding:0 24px;text-shadow:0 2px 4px #000;transition:opacity .4s}#cap b{display:block;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#e8c77a;margin-bottom:4px}#cap i{color:#d8c8a0}#skip{position:absolute;top:calc(14px + env(safe-area-inset-top));right:12px;font:13px Georgia;padding:6px 12px;background:rgba(0,0,0,.45);color:#e8c77a;border:1px solid #e8c77a;border-radius:20px}';
let g,w,h;
const L=(a,b,k)=>a+(b-a)*Math.max(0,Math.min(1,k));
function fig(x,y,s,body,head,o={}){g.save();g.translate(x,y);g.scale(s,s);if(o.rot)g.rotate(o.rot);g.fillStyle=body;g.beginPath();g.ellipse(0,0,14,26,0,0,7);g.fill();g.fillStyle=head;g.beginPath();g.arc(0,-34,11,0,7);g.fill();if(o.hair){g.fillStyle=o.hair;g.beginPath();g.arc(0,-38,11,Math.PI,0);g.fill()}if(o.hat){g.fillStyle=o.hat;g.fillRect(-12,-50,24,8);g.fillRect(-7,-62,14,13)}g.restore()}
function txt(s,x,y,f,c,a){g.font=f;g.fillStyle=c;g.textAlign=a||'center';g.fillText(s,x,y);g.textAlign='left'}
function play(shots,onEnd){
 const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
 const ov=document.createElement('div');ov.id='cut';ov.innerHTML='<canvas></canvas><div id="cap"></div><button id="skip">Skip ›</button>';document.body.appendChild(ov);
 const cv=ov.firstChild,cap=ov.querySelector('#cap');g=cv.getContext('2d');
 function fit(){const d=devicePixelRatio||1;w=innerWidth;h=innerHeight;cv.width=w*d;cv.height=h*d;g.setTransform(d,0,0,d,0,0)}fit();addEventListener('resize',fit);
 const total=shots.reduce((a,s)=>a+s.d,0);let t0=performance.now(),done=false,shown=-1,hold=false;
 function end(){if(done)return;done=true;ov.style.transition='opacity .6s';ov.style.opacity=0;setTimeout(()=>{ov.remove();st.remove();onEnd&&onEnd()},600)}
 ov.querySelector('#skip').onclick=e=>{e.stopPropagation();end()};
 ov.addEventListener('pointerdown',()=>{if(hold)end()});
 function frame(now){if(done)return;let s=(now-t0)/1000;if(s>=total){s=total-0.001;hold=true}
  let acc=0,i=0;while(i<shots.length-1&&s>=acc+shots[i].d){acc+=shots[i].d;i++}
  const sh=shots[i],k=(s-acc)/sh.d;g.clearRect(0,0,w,h);sh.draw(k,s);
  if(sh.cut!==false){const f=Math.min(1,Math.min(k*sh.d,(1-k)*sh.d)/.35);if(f<1){g.fillStyle=`rgba(0,0,0,${1-f})`;g.fillRect(0,0,w,h)}}
  const b=h*.1;g.fillStyle='#000';g.fillRect(0,0,w,b);g.fillRect(0,h-b,w,b);
  if(i!==shown){shown=i;cap.innerHTML=sh.who?`<b>${sh.who}</b>${sh.cap}`:(sh.cap?`<i>${sh.cap}</i>`:'')}
  if(hold){g.globalAlpha=.5+.5*Math.sin(now/300);txt('Tap to continue',w/2,h-b/2+5,'14px Georgia','#e8c77a');g.globalAlpha=1}
  requestAnimationFrame(frame)}
 requestAnimationFrame(frame);
}
return{play,L,fig,txt,get g(){return g},get w(){return w},get h(){return h}};
})();
