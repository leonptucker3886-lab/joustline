// Joustline cutscene engine v2: cinematic camera, lit painted characters, atmosphere, synth sound.
window.Cut=(function(){
const css='#cut{position:fixed;inset:0;z-index:50;background:#000;touch-action:none}#cut canvas{position:absolute;inset:0;width:100%;height:100%}#cap{position:absolute;left:0;right:0;bottom:11.5%;text-align:center;font:clamp(15px,4.2vw,20px) Georgia,serif;color:#f6ead0;padding:0 22px;text-shadow:0 2px 6px #000,0 0 18px #000;line-height:1.35}#cap b{display:block;font-size:clamp(10px,2.8vw,12px);letter-spacing:.16em;text-transform:uppercase;color:#e8c77a;margin-bottom:5px}#cap i{color:#ddd0ae}.cb{position:absolute;top:calc(14px + env(safe-area-inset-top));font:13px Georgia;padding:7px 14px;background:rgba(0,0,0,.5);color:#e8c77a;border:1px solid #e8c77a;border-radius:20px;z-index:2}#skip{right:12px}#snd{left:12px}';
let g,w,h,AC=null,muted=false;
const L=(a,b,k)=>a+(b-a)*Math.max(0,Math.min(1,k));
const ease=k=>{k=Math.max(0,Math.min(1,k));return k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2};
function rg(x,y,r,a,b){const q=g.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,a);q.addColorStop(1,b);return q}
function lg(x0,y0,x1,y1,st){const q=g.createLinearGradient(x0,y0,x1,y1);st.forEach(s=>q.addColorStop(s[0],s[1]));return q}
function sh(hex,a){const n=parseInt(hex.slice(1),16),f=v=>Math.max(0,Math.min(255,Math.round(a<0?v*(1+a):v+(255-v)*a)));return`rgb(${f(n>>16)},${f(n>>8&255)},${f(n&255)})`}
function el(x,y,rx,ry,c,r){g.fillStyle=c;g.beginPath();g.ellipse(x,y,rx,ry,r||0,0,7);g.fill()}
function limb(ax,ay,bx,by,l1,l2,bend,wd,c){let dx=bx-ax,dy=by-ay,d=Math.hypot(dx,dy)||.001;const m=l1+l2-.5;if(d>m){bx=ax+dx*m/d;by=ay+dy*m/d;dx=bx-ax;dy=by-ay;d=m}const a=(l1*l1-l2*l2+d*d)/(2*d),hh=Math.sqrt(Math.max(0,l1*l1-a*a)),ux=dx/d,uy=dy/d;g.strokeStyle=c;g.lineWidth=wd;g.lineCap='round';g.beginPath();g.moveTo(ax,ay);g.quadraticCurveTo(ax+ux*a-uy*hh*bend*2,ay+uy*a+ux*hh*bend*2,bx,by);g.stroke()}
// Painted person. o:{body,skin,hair,hat,beard,cloak,armor,helm,plume,rot,face,look,t,arm,arm2}
function person(x,y,s,o){o=o||{};const t=o.t||0,br=Math.sin(t*2.2)*1.1,B=o.body||'#7a1f1f',S=o.skin||'#e8b890';g.save();g.translate(x,y);g.scale(s,s);if(o.rot)g.rotate(o.rot);
 if(!o.seat)el(0,45,22,5,'rgba(0,0,0,.32)');
 if(o.seat){const F=o.dir||1;limb(-4*F,16,6*F,38,12,12,-.5*F,8,sh(B,-.75));limb(5*F,16,16*F,38,12,12,-.5*F,8,sh(B,-.5));el(9*F,40,7,3.3,'#1d130b');el(19*F,40,7,3.3,'#1d130b')}else{limb(-6,18,-7,44,14,14,-.3,8,sh(B,-.6));limb(6,18,7,44,14,14,.3,8,sh(B,-.55));el(-8,45,7,3.3,'#1d130b');el(8,45,7,3.3,'#1d130b')}
 if(o.cloak){g.fillStyle=lg(-26,0,26,0,[[0,sh(o.cloak,-.55)],[.5,o.cloak],[1,sh(o.cloak,-.6)]]);g.beginPath();g.moveTo(-15,-22);g.quadraticCurveTo(-30,12,-23,42);g.lineTo(23,42);g.quadraticCurveTo(30,12,15,-22);g.fill()}
 g.fillStyle=lg(-18,0,18,0,[[0,sh(B,-.5)],[.42,sh(B,.15)],[1,sh(B,-.55)]]);g.beginPath();g.moveTo(-16,-22+br*.3);g.quadraticCurveTo(-21,0,-15,22);g.lineTo(15,22);g.quadraticCurveTo(21,0,16,-22+br*.3);g.quadraticCurveTo(0,-28,-16,-22+br*.3);g.fill();
 if(o.armor){g.fillStyle=lg(-16,-20,16,10,[[0,'#59626c'],[.4,'#e2e9ee'],[.62,'#98a4b0'],[1,'#383f47']]);g.beginPath();g.moveTo(-14,-20);g.quadraticCurveTo(0,-27,14,-20);g.lineTo(12,6);g.quadraticCurveTo(0,12,-12,6);g.fill();g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=1;g.beginPath();g.moveTo(0,-22);g.lineTo(0,8);g.stroke()}
 g.fillStyle='#3a2410';g.fillRect(-15,8,30,4);g.fillStyle='#d4ab52';g.fillRect(-3,7.5,6,5);
 const a1=o.arm??.15,a2=o.arm2??.15;limb(-15,-18,-15-Math.sin(a1)*26,-18+Math.cos(a1)*26,14,14,.4,9,sh(B,-.3));limb(15,-18,15+Math.sin(a2)*26,-18+Math.cos(a2)*26,14,14,-.4,9,sh(B,-.3));
 el(-15-Math.sin(a1)*27,-18+Math.cos(a1)*27,4.3,4.3,S);el(15+Math.sin(a2)*27,-18+Math.cos(a2)*27,4.3,4.3,S);
 g.fillStyle=sh(S,-.28);g.fillRect(-4,-31,8,9);
 g.save();g.translate(0,-41+br*.4);
 g.fillStyle=rg(-3,-4,16,sh(S,.18),sh(S,-.38));g.beginPath();g.ellipse(0,0,10.5,12.5,0,0,7);g.fill();el(-10,1,2.2,3.4,sh(S,-.22));el(10,1,2.2,3.4,sh(S,-.22));
 el(-6,4,2.6,1.6,'rgba(220,90,80,.25)');el(6,4,2.6,1.6,'rgba(220,90,80,.25)');
 const lk=(o.look||0)*2,f=o.face||'calm';
 if(f==='grimace'||f==='closed'){g.strokeStyle='#2a1a10';g.lineWidth=1.4;g.beginPath();g.moveTo(-6,-2);g.lineTo(-2,-1.2);g.moveTo(6,-2);g.lineTo(2,-1.2);g.stroke()}
 else[-4,4].forEach(ex=>{el(ex,-1.5,2.3,f==='sly'?1:1.75,'#f6f0e4');el(ex+lk,-1.4,1.15,f==='sly'?.9:1.25,'#23180f');el(ex+lk+.4,-1.9,.35,.35,'#fff')});
 const up=f==='shout'?2:f==='grimace'?1.5:0;g.strokeStyle=sh(o.hair||'#3a2510',-.2);g.lineWidth=1.4;g.beginPath();g.moveTo(-7,-5+up*.6);g.lineTo(-2,-6-up*.3);g.moveTo(7,-5+up*.6);g.lineTo(2,-6-up*.3);g.stroke();
 g.strokeStyle=sh(S,-.38);g.lineWidth=1;g.beginPath();g.moveTo(0,-1);g.lineTo(1.3,4);g.lineTo(-.8,4.4);g.stroke();
 g.strokeStyle='#5a2418';g.fillStyle='#3a120c';g.lineWidth=1.3;g.beginPath();
 if(f==='shout'){g.ellipse(0,7.6,3.7,3.4,0,0,7);g.fill()}else if(f==='grin'){g.arc(0,5,4,.25,Math.PI-.25);g.stroke()}else if(f==='grimace'){g.moveTo(-4,7.5);g.lineTo(-1.5,6.4);g.lineTo(1.5,8);g.lineTo(4,7);g.stroke()}else if(f==='sly'){g.moveTo(-3,7.5);g.quadraticCurveTo(1,8.2,4,5.5);g.stroke()}else{g.moveTo(-3,7.5);g.lineTo(3,7.5);g.stroke()}
 if(o.beard){g.fillStyle=o.beard;g.beginPath();g.moveTo(-9.5,2);g.quadraticCurveTo(0,21,9.5,2);g.quadraticCurveTo(0,11,-9.5,2);g.fill()}
 if(o.hair){g.fillStyle=lg(0,-14,0,4,[[0,sh(o.hair,.15)],[1,o.hair]]);g.beginPath();g.ellipse(0,-6,11.6,8,0,Math.PI,0);g.fill();g.fillRect(-11.6,-6,3,9);g.fillRect(8.6,-6,3,9)}
 if(o.hat){g.fillStyle=o.hat;g.beginPath();g.ellipse(0,-10,14.5,4,0,0,7);g.fill();g.beginPath();g.moveTo(-8,-10);g.quadraticCurveTo(-9,-25,0,-25);g.quadraticCurveTo(9,-25,8,-10);g.fill();g.fillStyle='rgba(255,255,255,.14)';g.fillRect(-7,-15,14,2)}
 if(o.helm){g.fillStyle=lg(-12,-14,12,10,[[0,'#48505a'],[.45,'#e8eef3'],[1,'#383e46']]);g.beginPath();g.ellipse(0,-1,12.2,14,0,0,7);g.fill();g.fillStyle='#111';g.fillRect(-8,-3,16,2.6);g.fillStyle=o.plume||'#b01e1e';g.beginPath();g.moveTo(0,-14);g.quadraticCurveTo(-14,-31,-24,-11);g.quadraticCurveTo(-10,-21,0,-14);g.fill()}
 g.restore();g.restore()}
function horse(x,y,s,o){o=o||{};const t=o.t||0,gp=o.gallop?t*13:0,c=o.coat||'#5a3a1a';g.save();g.translate(x,y);g.scale(s*(o.flip?-1:1),s);
 el(0,42,48,6,'rgba(0,0,0,.33)');
 [[-26,.0],[-18,Math.PI],[22,Math.PI*.5],[30,Math.PI*1.5]].forEach(([lx,ph])=>{const sw=o.gallop?Math.sin(gp+ph)*10:0;limb(lx,6,lx+sw,40-Math.max(0,Math.cos(gp+ph))*(o.gallop?6:0),18,18,lx<0?-.4:.4,7,sh(c,-.45));el(lx+sw,41,5,2.6,'#1a120a')});
 g.fillStyle=lg(0,-20,0,18,[[0,sh(c,.2)],[.6,c],[1,sh(c,-.5)]]);g.beginPath();g.ellipse(0,0,40,17,0,0,7);g.fill();
 g.save();g.translate(32,-8);g.rotate(-.75+(o.gallop?Math.sin(gp)*.08:0));g.fillStyle=sh(c,.05);g.beginPath();g.ellipse(14,0,18,9,0,0,7);g.fill();g.beginPath();g.ellipse(32,4,12,7,.5,0,7);g.fill();el(30,-3,1.6,1.6,'#111');g.fillStyle=sh(c,-.6);g.beginPath();g.moveTo(2,-8);g.quadraticCurveTo(14,-14,26,-8);g.lineTo(24,-5);g.quadraticCurveTo(14,-10,4,-4);g.fill();g.restore();
 g.strokeStyle=sh(c,-.6);g.lineWidth=5;g.beginPath();g.moveTo(-38,-4);g.quadraticCurveTo(-52,4+(o.gallop?Math.sin(gp)*4:0),-50,20);g.stroke();
 if(o.caparison){g.fillStyle=lg(-40,0,40,0,[[0,sh(o.caparison,-.4)],[.5,o.caparison],[1,sh(o.caparison,-.4)]]);g.beginPath();g.moveTo(-38,-6);g.lineTo(34,-6);g.lineTo(30,22);for(let i=0;i<7;i++)g.lineTo(30-i*10.5-5,26+(i%2)*3+Math.sin(t*6+i)*1.5);g.lineTo(-40,22);g.fill();g.fillStyle='#e8c77a';g.fillRect(-38,-6,72,3)}
 g.restore()}
// Painted backdrop in the lance-and-crown style: dusk sky, sun glow, hills, castle towers, pennants.
function sky(t,{hz=.58,warm=1}={}){const H=h*hz;g.fillStyle=lg(0,0,0,H,[[0,'#16112a'],[.35,'#3a1f4c'],[.66,'#7a3450'],[.86,'#c25e42'],[1,'#ec9a58']]);g.fillRect(0,0,w,H+2);
 g.fillStyle=rg(w*.72,H*.86,h*.36,'rgba(255,228,170,.95)','rgba(255,160,90,0)');g.fillRect(0,0,w,H);el(w*.72,H*.86,h*.035,h*.035,'#fff1cf');
 for(let i=0;i<3;i++){g.fillStyle=`rgba(255,200,170,${.12+i*.04})`;const cx=((t*6*(i+1)+i*w*.4)%(w*1.4))-w*.2;el(cx,H*(.25+i*.12),w*.14,h*.012)}
 const hill=(amp,y,c,f,p)=>{g.fillStyle=c;g.beginPath();g.moveTo(0,h);for(let x=0;x<=w;x+=8)g.lineTo(x,H-y+Math.sin(x*f+p)*amp+Math.sin(x*f*2.3+p)*amp*.4);g.lineTo(w,h);g.fill()};
 hill(h*.03,h*.07,'#5a3550',.006,1);
 [[.14,.05,.17],[.2,.035,.12],[.3,.04,.2]].forEach(([tx,tw,th])=>{g.fillStyle='#3d2540';g.fillRect(w*tx,H-h*th,w*tw,h*th);for(let k=0;k<4;k++)g.fillRect(w*tx+k*w*tw/3.5,H-h*th-6,w*tw/7,6);g.fillStyle='rgba(255,200,120,.7)';g.fillRect(w*tx+w*tw*.4,H-h*th*.7,3,5)});
 hill(h*.02,h*.03,'#3c2a3a',.009,4)}
function ground(y,c0,c1){g.fillStyle=lg(0,y,0,h,[[0,c0],[1,c1]]);g.fillRect(0,y,w,h-y)}
function pennant(x,y,c,t){g.strokeStyle='#5a4030';g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-40);g.stroke();g.fillStyle=c;g.beginPath();g.moveTo(x,y-40);g.quadraticCurveTo(x+12,y-38+Math.sin(t*5+x)*3,x+24,y-34+Math.sin(t*5+x)*4);g.lineTo(x,y-28);g.fill()}
function dust(t,n,c){for(let i=0;i<n;i++){const px=(i*137.5+t*12*(1+i%3))%w,py=(i*71.3+Math.sin(t+i)*20)%h;g.fillStyle=c||`rgba(255,220,160,${.08+.12*((i*7)%5)/5})`;g.beginPath();g.arc(px,py,1+(i%3)*.6,0,7);g.fill()}}
function vignette(a){g.fillStyle=rg(w/2,h/2,Math.max(w,h)*.75,'rgba(0,0,0,0)',`rgba(0,0,0,${a??.55})`);g.fillRect(0,0,w,h)}
function txt(s,x,y,f,c,a){g.font=f;g.fillStyle=c;g.textAlign=a||'center';g.fillText(s,x,y);g.textAlign='left'}
function fig(x,y,s,body,head,o){o=o||{};person(x,y+8*s,s*.8,{body,skin:head,hair:o.hair,hat:o.hat,rot:o.rot,t:performance.now()/1000+x})}
// Synth sound: no audio files needed.
function ac(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state==='suspended')AC.resume();return AC}
function tone(f,d,type,vol,slide){const a=ac();if(!a||muted)return;const o=a.createOscillator(),v=a.createGain(),n=a.currentTime;o.type=type||'sine';o.frequency.setValueAtTime(f,n);if(slide)o.frequency.exponentialRampToValueAtTime(slide,n+d);v.gain.setValueAtTime(0,n);v.gain.linearRampToValueAtTime(vol||.15,n+.02);v.gain.exponentialRampToValueAtTime(.0001,n+d);o.connect(v).connect(a.destination);o.start(n);o.stop(n+d+.05)}
function noise(d,vol,lp){const a=ac();if(!a||muted)return;const b=a.createBuffer(1,a.sampleRate*d,a.sampleRate),q=b.getChannelData(0);for(let i=0;i<q.length;i++)q[i]=(Math.random()*2-1)*(1-i/q.length);const s=a.createBufferSource(),f=a.createBiquadFilter(),v=a.createGain();s.buffer=b;f.type='lowpass';f.frequency.value=lp||1200;v.gain.value=vol||.3;s.connect(f).connect(v).connect(a.destination);s.start()}
const sfx={crash(){noise(.6,.5,2500);tone(90,.5,'sawtooth',.2,40)},sting(){[220,233,311].forEach((f,i)=>setTimeout(()=>tone(f,.9,'triangle',.12),i*60))},whistle(){tone(500,.7,'sine',.12,1400);setTimeout(()=>tone(1400,.5,'sine',.1,600),550)},harpsi(){[392,494,587,784,587,494].forEach((f,i)=>setTimeout(()=>tone(f,.35,'square',.04),i*140))},crowd(){noise(1.8,.15,700)},thud(){tone(70,.25,'sine',.35,40)},page(){noise(.25,.12,4000)},door(){tone(110,.6,'triangle',.08,80)}};
function buzz(p){try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}}
function splinters(cx,cy,k,n){for(let i=0;i<(n||26);i++){const a=i*2.4,sp=60+(i*37)%160,x=cx+Math.cos(a)*sp*k,y=cy+Math.sin(a)*sp*k*.7+160*k*k;g.save();g.translate(x,y);g.rotate(a+k*9);g.globalAlpha=Math.max(0,1-k*1.1);g.fillStyle=i%3?'#d8b47a':'#f3dcae';g.fillRect(-7,-1.5,14,3);g.restore()}g.globalAlpha=1}
let shakeAmt=0;function shake(a){shakeAmt=Math.max(shakeAmt,a)}
function play(shots,onEnd){
 const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
 const ov=document.createElement('div');ov.id='cut';ov.innerHTML='<canvas></canvas><div id="cap"></div><button id="snd" class="cb">♪ Sound on</button><button id="skip" class="cb">Skip ›</button>';document.body.appendChild(ov);
 const cv=ov.firstChild,cap=ov.querySelector('#cap'),sb=ov.querySelector('#snd');g=cv.getContext('2d');
 sb.onclick=e=>{e.stopPropagation();muted=!muted;if(!muted)ac();sb.textContent=muted?'♪ Sound off':'♪ Sound on'};
 function fit(){const d=Math.min(2,devicePixelRatio||1);w=innerWidth;h=innerHeight;cv.width=w*d;cv.height=h*d;g.setTransform(d,0,0,d,0,0)}fit();addEventListener('resize',fit);
 const total=shots.reduce((a,s)=>a+s.d,0);let t0=performance.now(),done=false,shown=-1,hold=false;
 function end(){if(done)return;done=true;ov.style.transition='opacity .6s';ov.style.opacity=0;setTimeout(()=>{ov.remove();st.remove();onEnd&&onEnd()},600)}
 ov.querySelector('#skip').onclick=e=>{e.stopPropagation();end()};
 ov.addEventListener('pointerdown',()=>{ac();if(hold)end()});
 function frame(now){if(done)return;let s=(now-t0)/1000;if(s>=total){s=total-.001;hold=true}
  let acc=0,i=0;while(i<shots.length-1&&s>=acc+shots[i].d){acc+=shots[i].d;i++}
  const sh=shots[i],k=(s-acc)/sh.d;
  if(i!==shown){shown=i;cap.innerHTML=sh.who?`<b>${sh.who}</b>${sh.cap}`:(sh.cap?`<i>${sh.cap}</i>`:'');sh.sfx&&sh.sfx()}
  const d=Math.min(2,devicePixelRatio||1);g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,w,h);
  const z=sh.zoom?L(sh.zoom[0],sh.zoom[1],ease(k)):1,fx=sh.focus?sh.focus[0]*w:w/2,fy=sh.focus?sh.focus[1]*h:h/2,px=sh.pan?L(sh.pan[0],sh.pan[1],ease(k))*w:0;
  const sx=(Math.random()-.5)*shakeAmt,sy=(Math.random()-.5)*shakeAmt;shakeAmt*=.88;
  g.save();g.translate(fx+sx,fy+sy);g.scale(z,z);g.translate(-fx+px,-fy);sh.draw(k,s);g.restore();
  dust(s,26);vignette(sh.vig);
  if(sh.cut!==false){const f=Math.min(1,Math.min(k*sh.d,(1-k)*sh.d)/.35);if(f<1){g.fillStyle=`rgba(0,0,0,${1-f})`;g.fillRect(0,0,w,h)}}
  const b=h*.1;g.fillStyle='#000';g.fillRect(0,0,w,b);g.fillRect(0,h-b,w,b);
  if(hold){g.globalAlpha=.5+.5*Math.sin(now/300);txt('Tap to continue',w/2,h-b/2+5,'14px Georgia','#e8c77a');g.globalAlpha=1}
  requestAnimationFrame(frame)}
 requestAnimationFrame(frame);
}
return{play,L,ease,fig,txt,person,horse,sky,ground,pennant,el,lg,rg,sh,sfx,buzz,shake,splinters,vignette,get g(){return g},get w(){return w},get h(){return h}};
})();
