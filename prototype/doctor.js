// The Doctor cutscene v2: Bart's "injury". The cramp is REAL; the Baron's doctor lies about how bad it is. Diagnosis: a Charles Horse.
function doctorCut(onEnd){const C=Cut,L=C.L;let g,w,h;const sync=()=>{g=C.g;w=C.w;h=C.h};const SC=()=>Math.min(.95,w/430),RY=()=>h*.63-23*SC()/.95,OY=()=>h*.6-21*SC()/.95;let P={bx:0,ox:0}; // riders sit IN the saddle, tied to their own horse; scaled to phone width
const BART={body:'#7a1f1f',skin:'#e8b890',hair:'#3a2510',beard:'#4a3018'},DOC={body:'#141018',cloak:'#0c0a10',skin:'#d8c0a0',hat:'#0e0c12',face:'sly'},SQ={body:'#4a6b3a',skin:'#e9c29a',hair:'#5a3a1a'},BARON={body:'#0a0a0a',cloak:'#2a0e14',skin:'#c8b090',hat:'#0a0a0a',beard:'#6a6a6a',face:'sly'},SERV={body:'#6a5a4a',skin:'#d8b090',hair:'#2a1a10'};
function crowd(t,cheer){for(let r=0;r<2;r++)for(let i=0;i<18;i++){const x=w*(i+.5*r)/17,y=h*(.4+r*.05)-Math.abs(Math.sin(t*(cheer?9:3)+i*1.7))*(cheer?6:2);C.person(x,y,.42+r*.06,{body:['#b03a2e','#2e5fb0','#7a3ab0','#2e8a5a','#b08a2e'][(i+r)%5],skin:['#e0b890','#c89870','#f0c8a0'][i%3],hair:['#3a2510','#1a1008','#8a5a2a'][i%3],t:t+i,arm:cheer&&i%2?2.6:.15,arm2:cheer&&i%3?2.6:.15})}
 C.g.fillStyle=C.lg(0,h*.44,0,h*.52,[[0,'#8a5a24'],[1,'#4a2e12']]);C.g.fillRect(0,h*.45,w,h*.06);for(let i=0;i<9;i++){C.g.fillStyle=i%2?'#b01e1e':'#e8c77a';C.g.fillRect(w*i/8-10,h*.45,20,h*.06)}}
function lists(k,t,o={}){sync();C.sky(t);C.ground(h*.55,'#5f7a34','#2c3d18');
 g.fillStyle=C.lg(0,h*.6,0,h*.64,[[0,'#c9a46a'],[1,'#7a5a30']]);g.fillRect(0,h*.6,w,h*.035);
 g.fillStyle='#e8d8b0';g.fillRect(0,h*.585,w,5);for(let x=0;x<w;x+=w/10)g.fillRect(x,h*.585,5,h*.04);
 for(let i=0;i<5;i++)C.pennant(w*(.1+i*.2),h*.45,['#b01e1e','#2e5fb0','#e8c77a'][i%3],t);
 crowd(t,o.cheer);C.person(w*.88,h*.36,.5,Object.assign({t},BARON));
 const sc=SC(),gap=70*sc,bx=o.bx??L(-80,w/2-gap,k),ox=o.ox??L(w+80,w/2+gap,k),gal=!o.hit,f=o.fall||0;P={bx,ox};
 C.horse(ox,h*.6,sc*.88,{t,gallop:gal,flip:true,coat:'#1e1e22',caparison:'#2a2a4a'});C.person(ox+4*sc,OY(),sc*.8,{t,seat:1,dir:-1,body:'#3a3a44',armor:1,helm:1,plume:'#222',skin:'#999'});
 g.strokeStyle='#cfc4a8';g.lineWidth=5*sc;g.lineCap='round';g.beginPath();g.moveTo(ox-10*sc,OY()-2);g.lineTo(ox-(o.broke?50:115)*sc,OY()-4);g.stroke();
 g.fillStyle='#7a5a30';g.fillRect(0,h*.615,w,4);for(let x=0;x<w;x+=w/8)g.fillRect(x,h*.6,4,h*.02);
 C.horse(bx,h*.63,sc,{t,gallop:gal,coat:'#8a5a2c',caparison:'#7a1f1f'});
 if(!o.noBart)C.person(bx-4*sc+f*20,RY()+f*55,sc*.85,Object.assign({t,seat:f<.2?1:0,armor:1,helm:1,plume:'#b01e1e',rot:f*-1.4,face:'grimace'},BART));
 if(!o.broke&&!o.noBart){g.strokeStyle='#e8d8b0';g.lineWidth=6*sc;g.beginPath();g.moveTo(bx+12*sc,RY()-2);g.lineTo(bx+120*sc,RY()-6);g.stroke()}}
function tent(t,o={}){sync();
 g.fillStyle=C.lg(0,0,0,h,[[0,'#1c120a'],[1,'#3a2414']]);g.fillRect(0,0,w,h);
 g.fillStyle=C.lg(0,0,w,0,[[0,'#3a2412'],[.5,'#6a4424'],[1,'#3a2412']]);g.beginPath();g.moveTo(0,h*.2);g.lineTo(w/2,h*.03);g.lineTo(w,h*.2);g.lineTo(w,h*.68);g.lineTo(0,h*.68);g.fill();
 g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=2;for(let i=1;i<8;i++){g.beginPath();g.moveTo(w/2,h*.03);g.lineTo(w*i/8,h*.68);g.stroke()}
 const fl=.85+.15*Math.sin(t*11)*Math.sin(t*7.3);g.fillStyle=C.rg(w*.86,h*.42,h*.5*fl,'rgba(255,190,100,.5)','rgba(255,150,60,0)');g.fillRect(0,0,w,h);
 g.fillStyle='#d8c8a0';g.fillRect(w*.855,h*.42,8,22);C.el(w*.86,h*.4,4,8*fl,'#ffd27a');C.el(w*.86,h*.41,2,4,'#fff6d8');
 g.fillStyle=C.lg(0,h*.66,0,h,[[0,'#4a3018'],[1,'#22140a']]);g.fillRect(0,h*.66,w,h*.34);
 g.fillStyle='#5a3a1e';g.fillRect(w*.78,h*.55,w*.16,10);g.fillRect(w*.8,h*.55,6,h*.12);g.fillRect(w*.91,h*.55,6,h*.12);
 g.fillStyle=C.lg(w*.84,0,w*.84+22,0,[[0,'#8a5a1a'],[.5,'#e0a440'],[1,'#7a4a12']]);g.fillRect(w*.83,h*.51,22,h*.04);g.fillStyle='#fff3c8';C.el(w*.83+11,h*.51,11,3,'#fff3c8');
 C.txt('ALE',w*.83+11,h*.49,'bold 11px Georgia','#ffe9a8');
 g.fillStyle=C.lg(0,h*.6,0,h*.66,[[0,'#8a6a44'],[1,'#4a3420']]);g.fillRect(w*.12,h*.6,w*.5,h*.05);g.fillStyle='#efe6d0';g.fillRect(w*.13,h*.585,w*.48,h*.02);
 const FL=h*.74,bx=o.bx??w*.36,by=o.up?FL-47:h*.585-14;
 C.person(bx,by,1.05,Object.assign({t,rot:o.up?0:-1.57,face:o.face||(o.up?'grin':'grimace'),look:o.up?1:0},BART));
 if(!o.up&&o.wrap){g.fillStyle='#f0e6cc';const cw=((o.wrap||12)+4)*1.7;g.fillRect(bx+18,by-16-cw*.2,76,cw);g.beginPath();g.ellipse(bx+94,by-16-cw*.2+cw/2,10,cw/2+3,0,0,6.3);g.fill();g.strokeStyle='rgba(120,100,70,.5)';for(let i=0;i<6;i++){g.beginPath();g.moveTo(bx+22+i*11,by-16-cw*.2+2);g.lineTo(bx+29+i*11,by-16-cw*.2+cw-2);g.stroke()}}
 if(o.up&&o.wrap){g.fillStyle='#f0e6cc';g.fillRect(bx-6,by+20,30,33);g.beginPath();g.ellipse(bx+12,by+51,16,6,0,0,6.3);g.fill();g.strokeStyle='rgba(120,100,70,.6)';for(let i=0;i<5;i++){g.beginPath();g.moveTo(bx-4,by+25+i*5);g.lineTo(bx+22,by+27+i*5);g.stroke()}}
 C.person(o.dx??w*.6,FL-47,1.05,Object.assign({t,arm:o.point?1.9:.2,face:o.shout?'shout':'sly',look:-1},DOC));
 C.person(Math.max(32,w*.08),FL-45,1,Object.assign({t,look:1,face:o.sqf||'calm'},SQ));
 if(o.servants){C.person(bx-42,FL-45,1,Object.assign({t,arm:1.2,arm2:1.2},SERV));C.person(bx+70,FL-45,1,Object.assign({t,arm:1.2,arm2:1.2},SERV))}
 if(o.baron){const xb=Math.min(w*.95,w-30);C.person(xb,FL-47,1,Object.assign({t},BARON));g.fillStyle='#efe2b8';g.fillRect(xb-22,FL-50,16,12);g.fillStyle='#1a1008';g.fillRect(xb-22,FL-50,2,12)}
 if(o.charles){C.person(Math.min(w*.98,w-24),FL-43,.95,{t,body:'#5a4a7a',skin:'#e0c0a0',hair:'#b0a080',face:'grin',arm2:2.2})}}
function sparks(cx,cy,k){sync();for(let i=0;i<22;i++){const a=i*.29-1.2,r=20+k*(90+(i*29)%80);g.strokeStyle=`rgba(255,${200+(i%3)*20},120,${Math.max(0,1-k*1.3)})`;g.lineWidth=2.5;g.beginPath();g.moveTo(cx+Math.cos(a)*r*.6,cy+Math.sin(a)*r*.6);g.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);g.stroke()}C.el(cx,cy,30*(1-k)+4,30*(1-k)+4,`rgba(255,250,220,${Math.max(0,.9-k)})`)}
function damage(x,y,sev){sync();g.save();g.translate(x,y);C.el(0,0,9*sev,6*sev,'rgba(40,40,50,.75)');g.strokeStyle='rgba(20,20,25,.9)';g.lineWidth=1.6;for(let i=0;i<5+sev*2;i++){const a=i*1.3;g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(a)*14*sev,Math.sin(a)*10*sev);g.stroke()}g.strokeStyle='rgba(255,255,255,.5)';g.beginPath();g.arc(-2,-2,6*sev,3.6,4.8);g.stroke();g.restore()}
function hitText(k,x,y,s,c){sync();const sc=1+Math.max(0,.4-k)*2;g.save();g.translate(x,y);g.scale(sc,sc);g.rotate(-.12);g.globalAlpha=Math.max(0,1-Math.max(0,k-.6)*2.5);C.txt(s,0,0,'900 44px Georgia','#2a0a0a');C.txt(s,-3,-3,'900 44px Georgia',c||'#ffd23a');g.restore();g.globalAlpha=1}
let hitOnce={};function once(id,fn){if(!hitOnce[id]){hitOnce[id]=1;fn()}}
const shots=[
 {d:3.6,zoom:[1,1.08],sfx:()=>{C.sfx.crowd()},draw:(k,t)=>{lists(k*.92,t,{cheer:1});sync();C.txt('THIRD PASS',w/2,h*.2,'bold 22px Georgia','rgba(232,199,122,'+Math.min(1,k*3)+')')},cap:'Third pass. Bart has not missed all morning.'},
 // THE STRIKE: slow motion, contact, splinters, sparks, shake, buzz
 {d:2.6,zoom:[1.15,1.9],focus:[.5,.56],cut:false,draw:(k,t)=>{const s=k<.45?k/.45*.08:.08;lists(.92+s,t*(k<.45?.25:1),{cheer:1,broke:k>.45,hit:k>.45});sync();
   if(k>.45){const q=(k-.45)/.55;once('a',()=>{C.sfx.crash();C.shake(28);C.buzz([60,40,120])});sparks(P.ox-6,OY()-4,q);C.splinters(P.ox-6,OY()-4,q,34);damage(P.ox+2,OY()-6,1.6);hitText(q,w*.5,h*.26,'HIT!');g.fillStyle=`rgba(255,255,255,${Math.max(0,.8-q*3)})`;g.fillRect(-w,-h,w*3,h*3)}},cap:'Lance meets steel. The shield cracks. Wood explodes into the air.'},
 {d:2.2,zoom:[1.5,1.6],focus:[.5,.56],cut:false,draw:(k,t)=>{lists(1,t,{broke:true,hit:true,cheer:1});sync();damage(P.ox+2,OY()-6,1.8);damage(P.ox-3,OY()+2,1.1)},cap:'The black knight reels. A dent the size of a fist in his breastplate.'},
 {d:2.6,zoom:[1.3,1.1],focus:[.45,.5],sfx:()=>{C.sfx.sting();setTimeout(()=>{C.sfx.thud();C.shake(18);C.buzz(90)},900)},draw:(k,t)=>{lists(1,t,{broke:true,hit:true,fall:C.ease(k*1.4)});sync();damage(P.ox+2,OY()-6,1.8);if(k>.6)hitText((k-.6)/.4,w*.44,h*.3,'CRAMP!','#ff6a3a')},cap:'A clean pass. Then Bart\'s leg locks like a crossbow. He topples out of the saddle.'},
 {d:4,zoom:[1,1.12],focus:[.4,.55],draw:(k,t)=>tent(t,{sqf:'calm'}),who:'Jacques ("Jack")',cap:'<i>His leg is knotted like a rope. He is grimacing. He never grimaces.</i>'},
 {d:4.5,sfx:()=>C.sfx.door(),draw:(k,t)=>tent(t,{dx:L(w+40,w*.6,C.ease(k*1.6))}),cap:'A doctor arrives before anyone has sent for one. Black velvet. The Baron\'s own man.'},
 {d:5,zoom:[1.05,1.5],focus:[.58,.42],sfx:()=>setTimeout(()=>C.sfx.whistle(),2200),draw:(k,t)=>tent(t,{point:k>.3,wrap:L(0,12,k)}),who:'The Baron\'s Doctor',cap:'I\'m afraid it\'s a severe… Charles Horse.'},
 {d:3,sfx:()=>C.sfx.door(),draw:(k,t)=>tent(t,{charles:true,wrap:12}),who:'Charles de Wierd (from the doorway)',cap:'You called?'},
 {d:2.5,zoom:[1,1.04],draw:(k,t)=>tent(t,{charles:true,wrap:12}),cap:'Nobody looks up.'},
 {d:3.5,zoom:[1.3,1.6],focus:[.36,.55],draw:(k,t)=>tent(t,{face:'grin',wrap:12}),who:'Sir Bart',cap:'Mm. Mm-hm. Terrible. …Is that ale?'},
 {d:4.5,pan:[0,-.1],draw:(k,t)=>tent(t,{up:true,wrap:12,bx:L(w*.4,Math.min(w*.78,w-60),C.ease(k))}),cap:'Bart gets up. Bart walks across the tent. Bart is very interested in the ale.'},
 {d:3,zoom:[1.2,1.35],focus:[.6,.4],sfx:()=>{C.shake(14);C.sfx.thud()},draw:(k,t)=>{tent(t,{up:true,wrap:12,bx:Math.min(w*.78,w-60),shout:true,point:true,dx:w*.5});sync();C.txt('GET BACK DOWN!',w/2+Math.sin(t*60)*3,h*.3,'900 '+Math.min(34,w/11)+'px Georgia','#ff5a3a')},who:'The Baron\'s Doctor',cap:'GET. BACK. DOWN!'},
 {d:4,draw:(k,t)=>tent(t,{servants:true,wrap:L(12,30,k)}),cap:'Two servants pin him to the cot. The doctor wraps the leg again. Twice as tight.'},
 {d:4.5,sfx:()=>C.sfx.harpsi(),zoom:[1,1.15],focus:[.7,.45],draw:(k,t)=>tent(t,{wrap:30,servants:true,baron:true,point:true}),who:'The Baron\'s Doctor',cap:'A Charles Horse this severe, untreated… you may never walk again. Paris. Only the surgeons of Paris can save him.'},
 {d:4.5,zoom:[1.2,1.4],focus:[.3,.55],draw:(k,t)=>tent(t,{wrap:30,baron:true,face:'grin'}),who:'Sir Bart',cap:'Don\'t look at him, my boy. Look at me. …Could someone bring the ale over here, then?'},
 {d:4.5,zoom:[1.2,2.4],focus:[.92,.52],sfx:()=>setTimeout(()=>C.sfx.page(),1200),draw:(k,t)=>{tent(t,{wrap:30,baron:true});sync();if(k>.5){g.fillStyle=`rgba(0,0,0,${(k-.5)*1.6})`;g.fillRect(0,0,w,h);C.txt('PAID',w*.92,h*.53,'bold 9px Georgia',`rgba(200,40,30,${(k-.5)*2})`)}},cap:'In the shadows, someone turns a page in a small black ledger. PAID.'},
 {d:4,pan:[0,.15],sfx:()=>C.sfx.harpsi(),draw:(k,t)=>tent(t,{wrap:30,servants:true,bx:L(w*.36,w*1.2,C.ease(k))}),who:'',cap:'At dawn the servants carry Bart out, bed and all. Destination: Paris.'},
 {d:3.5,draw:(k,t)=>{sync();C.sky(t);C.ground(h*.55,'#5f7a34','#2c3d18');const rd=h*.66,s=Math.min(.8,w/480),x=L(w*.15,w*1.15,k);
 g.fillStyle='#a08058';g.fillRect(0,rd-6,w,14);
 C.horse(x+120*s,rd-41*s,s,{t,gallop:1,coat:'#8a6a4a'});
 g.strokeStyle='#4a3018';g.lineWidth=4*s;g.beginPath();g.moveTo(x+40*s,rd-24*s);g.lineTo(x+95*s,rd-30*s);g.stroke();
 g.fillStyle='#6a4a2a';g.fillRect(x-60*s,rd-40*s,100*s,18*s);g.fillStyle='#efe6d0';g.fillRect(x-56*s,rd-48*s,92*s,9*s);
 [x-40*s,x+20*s].forEach(cx=>{g.strokeStyle='#3a2410';g.lineWidth=4*s;g.beginPath();g.arc(cx,rd-12*s,12*s,0,7);g.stroke();g.beginPath();g.moveTo(cx-12*s,rd-12*s);g.lineTo(cx+12*s,rd-12*s);g.moveTo(cx,rd-24*s);g.lineTo(cx,rd);g.stroke()});
 C.person(x-10*s,rd-62*s,s*.8,Object.assign({t,rot:-1.57,face:'grin'},BART));g.fillStyle='#f0e6cc';g.fillRect(x+8*s,rd-70*s,32*s,10*s)},who:'Sir Bart (fading down the road)',cap:'Somebody save me a cup!'},
 {d:4,zoom:[1,1.2],focus:[.5,.5],sfx:()=>C.sfx.crowd(),draw:(k,t)=>{lists(1,t,{bx:w/2-70*SC(),ox:w/2+70*SC(),noBart:1});C.person(w/2-70*SC()-4*SC(),RY(),SC()*.85,Object.assign({t,seat:1,look:1},SQ))},who:'The Herald',cap:'Sir Bart is… indisposed. His assistant, Jacques, will ride in his place!'},
 {d:3.5,zoom:[1.3,1.6],focus:[.4,.56],draw:(k,t)=>{lists(1,t,{bx:w/2-70*SC(),ox:w/2+70*SC(),noBart:1});sync();C.person(w/2-74*SC(),RY(),SC()*.85,Object.assign({t,seat:1,face:'grimace',look:1,arm:1.8,arm2:1.8},SQ))},who:'Jacques ("Jack")',cap:'<i>The saddle is very high. The horse is very large. Bart made this look easy.</i>'},
 {d:3,zoom:[1.6,1.9],focus:[.4,.56],sfx:()=>{C.sfx.thud();C.shake(10)},draw:(k,t)=>{lists(1,t,{bx:w/2-70*SC()+Math.sin(t*20)*4,ox:w/2+70*SC(),noBart:1});sync();C.person(w/2-74*SC()+Math.sin(t*20)*4,RY(),SC()*.85,Object.assign({t,seat:1,face:'shout',arm:2.8,arm2:2.8,rot:Math.sin(t*9)*.25},SQ))},cap:'The horse has opinions. Jack is stuck at the top of them.'},
 {d:4.5,zoom:[1.1,1],sfx:()=>{C.sfx.whistle();C.sfx.crowd()},draw:(k,t)=>{lists(1,t,{bx:w/2-70*SC(),ox:w/2+70*SC(),cheer:1,noBart:1});sync();C.person(w/2-74*SC(),RY(),SC()*.85,Object.assign({t,seat:1,face:'shout',arm:2.8,arm2:2.8},SQ));C.txt('Somebody please help Jack off the horse!',w/2,h*.22,'900 '+Math.min(26,w/22)+'px Georgia','#ffd23a')},who:'The Baron',cap:'"Somebody please help Jack off the horse!"'},
 {d:3.5,draw:(k,t)=>{sync();g.fillStyle='#000';g.fillRect(-w,-h,w*3,h*3);g.globalAlpha=Math.min(1,k*2);C.txt('END OF CHAPTER 1',w/2,h*.46,'bold '+Math.min(26,w/15)+'px Georgia','#e8c77a');C.txt('The Charles Horse',w/2,h*.53,'italic 18px Georgia','#f3e6c8');g.globalAlpha=1},cap:''}
];C.play(shots,onEnd)}
