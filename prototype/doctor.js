// The Doctor cutscene v2: Bart's "injury". The cramp is REAL; the Baron's doctor lies about how bad it is. Diagnosis: a Charles Horse.
function doctorCut(onEnd){const C=Cut,L=C.L;let g,w,h;const sync=()=>{g=C.g;w=C.w;h=C.h};
const BART={body:'#7a1f1f',skin:'#e8b890',hair:'#3a2510',beard:'#4a3018'},DOC={body:'#141018',cloak:'#0c0a10',skin:'#d8c0a0',hat:'#0e0c12',face:'sly'},SQ={body:'#4a6b3a',skin:'#e9c29a',hair:'#5a3a1a'},BARON={body:'#0a0a0a',cloak:'#2a0e14',skin:'#c8b090',hat:'#0a0a0a',beard:'#6a6a6a',face:'sly'},SERV={body:'#6a5a4a',skin:'#d8b090',hair:'#2a1a10'};
function crowd(t,cheer){for(let r=0;r<2;r++)for(let i=0;i<18;i++){const x=w*(i+.5*r)/17,y=h*(.4+r*.05)-Math.abs(Math.sin(t*(cheer?9:3)+i*1.7))*(cheer?6:2);C.person(x,y,.42+r*.06,{body:['#b03a2e','#2e5fb0','#7a3ab0','#2e8a5a','#b08a2e'][(i+r)%5],skin:['#e0b890','#c89870','#f0c8a0'][i%3],hair:['#3a2510','#1a1008','#8a5a2a'][i%3],t:t+i,arm:cheer&&i%2?2.6:.15,arm2:cheer&&i%3?2.6:.15})}
 C.g.fillStyle=C.lg(0,h*.44,0,h*.52,[[0,'#8a5a24'],[1,'#4a2e12']]);C.g.fillRect(0,h*.45,w,h*.06);for(let i=0;i<9;i++){C.g.fillStyle=i%2?'#b01e1e':'#e8c77a';C.g.fillRect(w*i/8-10,h*.45,20,h*.06)}}
function lists(k,t,o={}){sync();C.sky(t);C.ground(h*.55,'#5f7a34','#2c3d18');
 g.fillStyle=C.lg(0,h*.6,0,h*.64,[[0,'#c9a46a'],[1,'#7a5a30']]);g.fillRect(0,h*.6,w,h*.035);
 g.fillStyle='#e8d8b0';g.fillRect(0,h*.585,w,5);for(let x=0;x<w;x+=w/10)g.fillRect(x,h*.585,5,h*.04);
 for(let i=0;i<5;i++)C.pennant(w*(.1+i*.2),h*.45,['#b01e1e','#2e5fb0','#e8c77a'][i%3],t);
 crowd(t,o.cheer);C.person(w*.88,h*.36,.5,Object.assign({t},BARON));
 const bx=o.bx??L(-80,w*.44,k),ox=o.ox??L(w+80,w*.56,k),gal=!o.hit;
 C.horse(ox,h*.63,.95,{t,gallop:gal,flip:true,coat:'#2a2a2a',caparison:'#2a2a3a'});C.person(ox-6,h*.43,.85,{t,body:'#3a3a44',armor:1,helm:1,plume:'#222',skin:'#999'});
 g.strokeStyle=C.lg(ox,0,ox-110,0,[[0,'#6a4a2a'],[1,'#e8d8b0']]);g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(ox-14,h*.42);g.lineTo(ox-(o.broke?60:120),h*.4);g.stroke();
 C.horse(bx,h*.63,.95,{t,gallop:gal,coat:'#6a4224',caparison:'#7a1f1f'});
 C.person(bx+6+(o.fall||0)*20,h*.43+(o.fall||0)*h*.18,.85,Object.assign({t,armor:1,helm:1,plume:'#b01e1e',rot:(o.fall||0)*-1.4,face:'grimace'},BART));
 if(!o.broke){g.strokeStyle='#e8d8b0';g.lineWidth=6;g.beginPath();g.moveTo(bx+14,h*.42);g.lineTo(bx+120,h*.4);g.stroke()}}
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
 const bx=o.bx??w*.36,by=o.by??h*.57;
 C.person(bx,by,1.05,Object.assign({t,rot:o.up?0:-1.57,face:o.face||(o.up?'grin':'grimace'),look:o.up?1:0},BART));
 if(!o.up){g.fillStyle='#f0e6cc';g.fillRect(bx+22,by-14,46,o.wrap||12);g.strokeStyle='rgba(120,100,70,.5)';for(let i=0;i<5;i++){g.beginPath();g.moveTo(bx+24+i*9,by-14);g.lineTo(bx+30+i*9,by-14+(o.wrap||12));g.stroke()}}
 C.person(o.dx??w*.6,h*.5,1.05,Object.assign({t,arm:o.point?1.9:.2,face:o.shout?'shout':'sly',look:-1},DOC));
 C.person(w*.08,h*.62,1,Object.assign({t,look:1,face:o.sqf||'calm'},SQ));
 if(o.servants){C.person(bx-34,h*.5,1,Object.assign({t,arm:1.2,arm2:1.2},SERV));C.person(bx+44,h*.5,1,Object.assign({t,arm:1.2,arm2:1.2},SERV))}
 if(o.baron){C.person(w*.95,h*.48,1,Object.assign({t},BARON));g.fillStyle='#efe2b8';g.fillRect(w*.91,h*.5,16,12);g.fillStyle='#1a1008';g.fillRect(w*.91,h*.5,2,12)}
 if(o.charles){C.person(w*.98,h*.52,.95,{t,body:'#5a4a7a',skin:'#e0c0a0',hair:'#b0a080',face:'grin',arm2:2.2})}}
function sparks(cx,cy,k){sync();for(let i=0;i<22;i++){const a=i*.29-1.2,r=20+k*(90+(i*29)%80);g.strokeStyle=`rgba(255,${200+(i%3)*20},120,${Math.max(0,1-k*1.3)})`;g.lineWidth=2.5;g.beginPath();g.moveTo(cx+Math.cos(a)*r*.6,cy+Math.sin(a)*r*.6);g.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);g.stroke()}C.el(cx,cy,30*(1-k)+4,30*(1-k)+4,`rgba(255,250,220,${Math.max(0,.9-k)})`)}
function damage(x,y,sev){sync();g.save();g.translate(x,y);C.el(0,0,9*sev,6*sev,'rgba(40,40,50,.75)');g.strokeStyle='rgba(20,20,25,.9)';g.lineWidth=1.6;for(let i=0;i<5+sev*2;i++){const a=i*1.3;g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(a)*14*sev,Math.sin(a)*10*sev);g.stroke()}g.strokeStyle='rgba(255,255,255,.5)';g.beginPath();g.arc(-2,-2,6*sev,3.6,4.8);g.stroke();g.restore()}
function hitText(k,x,y,s,c){sync();const sc=1+Math.max(0,.4-k)*2;g.save();g.translate(x,y);g.scale(sc,sc);g.rotate(-.12);g.globalAlpha=Math.max(0,1-Math.max(0,k-.6)*2.5);C.txt(s,0,0,'900 44px Georgia','#2a0a0a');C.txt(s,-3,-3,'900 44px Georgia',c||'#ffd23a');g.restore();g.globalAlpha=1}
let hitOnce={};function once(id,fn){if(!hitOnce[id]){hitOnce[id]=1;fn()}}
const shots=[
 {d:3.6,zoom:[1,1.08],sfx:()=>{C.sfx.crowd()},draw:(k,t)=>{lists(k*.92,t,{cheer:1});sync();C.txt('THIRD PASS',w/2,h*.2,'bold 22px Georgia','rgba(232,199,122,'+Math.min(1,k*3)+')')},cap:'Third pass. Bart has not missed all morning.'},
 // THE STRIKE: slow motion, contact, splinters, sparks, shake, buzz
 {d:2.6,zoom:[1.15,1.9],focus:[.5,.42],cut:false,draw:(k,t)=>{const s=k<.45?k/.45*.08:.08;lists(.92+s,t*(k<.45?.25:1),{cheer:1,broke:k>.45,hit:k>.45});sync();
   if(k>.45){const q=(k-.45)/.55;once('a',()=>{C.sfx.crash();C.shake(28);C.buzz([60,40,120])});sparks(w*.53,h*.4,q);C.splinters(w*.53,h*.4,q,34);damage(w*.555,h*.39,1.4);hitText(q,w*.5,h*.26,'HIT!');g.fillStyle=`rgba(255,255,255,${Math.max(0,.8-q*3)})`;g.fillRect(-w,-h,w*3,h*3)}},cap:'Lance meets steel. The shield cracks. Wood explodes into the air.'},
 {d:2.2,zoom:[1.5,1.6],focus:[.5,.45],cut:false,draw:(k,t)=>{lists(1,t,{broke:true,hit:true,cheer:1});sync();damage(w*.555,h*.39,1.4);damage(w*.548,h*.42,.9)},cap:'The black knight reels. A dent the size of a fist in his breastplate.'},
 {d:2.6,zoom:[1.3,1.1],focus:[.45,.5],sfx:()=>{C.sfx.sting();setTimeout(()=>{C.sfx.thud();C.shake(18);C.buzz(90)},900)},draw:(k,t)=>{lists(1,t,{broke:true,hit:true,fall:C.ease(k*1.4)});sync();damage(w*.555,h*.39,1.4);if(k>.6)hitText((k-.6)/.4,w*.44,h*.3,'CRAMP!','#ff6a3a')},cap:'A clean pass. Then Bart\'s leg locks like a crossbow. He topples out of the saddle.'},
 {d:4,zoom:[1,1.12],focus:[.4,.55],draw:(k,t)=>tent(t,{sqf:'calm'}),who:'Squire (you)',cap:'<i>His leg is knotted like a rope. He is grimacing. He never grimaces.</i>'},
 {d:4.5,sfx:()=>C.sfx.door(),draw:(k,t)=>tent(t,{dx:L(w+40,w*.6,C.ease(k*1.6))}),cap:'A doctor arrives before anyone has sent for one. Black velvet. The Baron\'s own man.'},
 {d:5,zoom:[1.05,1.5],focus:[.58,.42],sfx:()=>setTimeout(()=>C.sfx.whistle(),2200),draw:(k,t)=>tent(t,{point:k>.3}),who:'The Baron\'s Doctor',cap:'I\'m afraid it\'s a severe… Charles Horse.'},
 {d:3,sfx:()=>C.sfx.door(),draw:(k,t)=>tent(t,{charles:true}),who:'Charles de Wierd (from the doorway)',cap:'You called?'},
 {d:2.5,zoom:[1,1.04],draw:(k,t)=>tent(t,{charles:true}),cap:'Nobody looks up.'},
 {d:3.5,zoom:[1.3,1.6],focus:[.36,.55],draw:(k,t)=>tent(t,{face:'grin'}),who:'Sir Bart',cap:'Mm. Mm-hm. Terrible. …Is that ale?'},
 {d:4.5,pan:[0,-.1],draw:(k,t)=>tent(t,{up:true,bx:L(w*.4,w*.78,C.ease(k)),by:h*.52}),cap:'Bart gets up. Bart walks across the tent. Bart is very interested in the ale.'},
 {d:3,zoom:[1.2,1.35],focus:[.6,.4],sfx:()=>{C.shake(14);C.sfx.thud()},draw:(k,t)=>{tent(t,{up:true,bx:w*.78,by:h*.52,shout:true,point:true});sync();C.txt('GET BACK DOWN!',w/2+Math.sin(t*60)*3,h*.3,'900 34px Georgia','#ff5a3a')},who:'The Baron\'s Doctor',cap:'GET. BACK. DOWN!'},
 {d:4,draw:(k,t)=>tent(t,{servants:true,wrap:L(12,30,k)}),cap:'Two servants pin him to the cot. The doctor wraps the leg again. Twice as tight.'},
 {d:4.5,sfx:()=>C.sfx.harpsi(),zoom:[1,1.15],focus:[.7,.45],draw:(k,t)=>tent(t,{wrap:30,servants:true,baron:true,point:true}),who:'The Baron\'s Doctor',cap:'A Charles Horse this severe, untreated… you may never walk again. Paris. Only the surgeons of Paris can save him.'},
 {d:4.5,zoom:[1.2,1.4],focus:[.3,.55],draw:(k,t)=>tent(t,{wrap:30,baron:true,face:'grin'}),who:'Sir Bart',cap:'Don\'t look at him, my boy. Look at me. …Could someone bring the ale over here, then?'},
 {d:4.5,zoom:[1.2,2.4],focus:[.92,.52],sfx:()=>setTimeout(()=>C.sfx.page(),1200),draw:(k,t)=>{tent(t,{wrap:30,baron:true});sync();if(k>.5){g.fillStyle=`rgba(0,0,0,${(k-.5)*1.6})`;g.fillRect(0,0,w,h);C.txt('PAID',w*.92,h*.53,'bold 9px Georgia',`rgba(200,40,30,${(k-.5)*2})`)}},cap:'In the shadows, someone turns a page in a small black ledger. PAID.'}
];C.play(shots,onEnd)}
