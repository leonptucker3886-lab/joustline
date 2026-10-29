// The Doctor cutscene: Bart's "injury". The cramp is REAL; the Baron's doctor lies about how bad it is. Diagnosis: a Charles Horse.
function doctorCut(onEnd){const C=Cut,L=C.L;let g,w,h;const sync=()=>{g=C.g;w=C.w;h=C.h};
function lists(k,t,hit){sync();const s=g.createLinearGradient(0,0,0,h);s.addColorStop(0,'#6a8ac0');s.addColorStop(1,'#e8c08a');g.fillStyle=s;g.fillRect(0,0,w,h);
 g.fillStyle='#4a6a2a';g.fillRect(0,h*.58,w,h);g.fillStyle='#8a5a24';g.fillRect(0,h*.6,w,8);
 for(let i=0;i<14;i++)C.fig(w*i/13,h*.3+Math.sin(t*6+i)*2,.5,['#b03a2e','#2e5fb0','#7a3ab0','#2e8a5a'][i%4],'#e0b890');
 C.fig(w*.88,h*.29,.55,'#111','#d8c0a0',{hat:'#111'});
 const bx=L(-60,w*.46,k),ox=L(w+60,w*.54,k);
 g.fillStyle='#5a3a1a';g.beginPath();g.ellipse(bx,h*.62,34,16,0,0,7);g.fill();C.fig(bx,h*.52,.9,'#7a1f1f','#e8b890',{rot:hit?-.9:0});
 g.fillStyle='#2a2a2a';g.beginPath();g.ellipse(ox,h*.62,34,16,0,0,7);g.fill();C.fig(ox,h*.52,.9,'#444','#999');
 g.strokeStyle='#d8c8a0';g.lineWidth=4;g.beginPath();g.moveTo(ox-10,h*.5);g.lineTo(ox-80,h*.48);g.stroke();
 if(hit){g.fillStyle='#fff';g.globalAlpha=Math.max(0,1-k*3);g.fillRect(0,0,w,h);g.globalAlpha=1}}
function cot(t,o={}){sync();g.fillStyle='#3a2414';g.fillRect(0,0,w,h);g.fillStyle='#5a3a20';g.beginPath();g.moveTo(0,h*.2);g.lineTo(w/2,h*.04);g.lineTo(w,h*.2);g.lineTo(w,h);g.lineTo(0,h);g.fill();
 g.fillStyle='rgba(255,200,120,.25)';g.fillRect(w*.8,h*.2,w*.2,h*.5);
 g.fillStyle='#c98a2a';g.fillRect(w*.86,h*.52,22,26);g.fillStyle='#fff3c8';g.fillRect(w*.86,h*.5,22,5);C.txt('ALE',w*.86+11,h*.5-8,'bold 11px Georgia','#ffe9a8');
 g.fillStyle='#7a5a3a';g.fillRect(w*.12,h*.58,w*.56,h*.06);
 const bx=o.bx??w*.4,by=o.by??h*.56;C.fig(bx,by,1.1,'#7a1f1f','#e8b890',{rot:o.up?0:-1.57,hair:'#3a2510'});
 if(!o.up){g.fillStyle='#efe2c8';g.fillRect(bx+20,by-4,40,o.wrap||14);g.fillStyle='#a01020';for(let i=0;i<(o.blood||0);i++){g.beginPath();g.arc(bx+28+i*7,by+12+(i%2)*6,4,0,7);g.fill()}}
 C.fig(o.dx??w*.6,h*.5,1.05,'#111','#d8c0a0',{hat:'#111'});
 C.fig(w*.1,h*.66,1,'#4a6b3a','#e9c29a',{hair:'#5a3a1a'});
 if(o.servants){C.fig(bx-30,h*.5,1,'#6a5a4a','#d8b090');C.fig(bx+40,h*.5,1,'#6a5a4a','#d8b090')}
 if(o.baron){C.fig(w*.94,h*.48,1,'#0a0a0a','#c8b090',{hat:'#0a0a0a'});g.fillStyle='#efe2b8';g.fillRect(w*.9,h*.5,16,12)}}
const shots=[
 {d:4,draw:(k,t)=>lists(k*.9,t),cap:'Third pass. Bart has not missed all morning.'},
 {d:2.2,draw:(k,t)=>lists(1,t,true),cap:'A clean pass. Then Bart\'s leg locks like a crossbow. He topples out of the saddle.'},
 {d:4,draw:(k,t)=>cot(t,{blood:0}),who:'Squire (you)',cap:'<i>His leg is knotted like a rope. He is grimacing. He never grimaces.</i>'},
 {d:4.5,draw:(k,t)=>cot(t,{blood:0,dx:L(w+40,w*.6,k*2)}),who:'',cap:'A doctor arrives before anyone has sent for one. Black velvet. The Baron\'s own man.'},
 {d:5,draw:(k,t)=>cot(t,{blood:0}),who:'The Baron\'s Doctor',cap:'I\'m afraid it\'s a severe… Charles Horse.'},
 {d:3,draw:(k,t)=>cot(t,{blood:0}),who:'Charles de Wierd (from the doorway)',cap:'You called?'},
 {d:2.5,draw:(k,t)=>cot(t,{blood:0}),who:'',cap:'Nobody looks up.'},
 {d:3.5,draw:(k,t)=>cot(t,{blood:0}),who:'Sir Bart',cap:'Mm. Mm-hm. Terrible. …Is that ale?'},
 {d:4.5,draw:(k,t)=>cot(t,{up:true,bx:L(w*.4,w*.8,k),by:h*.52}),who:'',cap:'Bart gets up. Bart walks across the tent. Bart is very interested in the ale.'},
 {d:3,draw:(k,t)=>{cot(t,{up:true,bx:w*.8,by:h*.52});sync();C.txt('GET BACK DOWN!',w/2+Math.sin(t*60)*3,h*.3,'bold 34px Georgia','#ff5a3a')},who:'The Baron\'s Doctor',cap:'GET. BACK. DOWN!'},
 {d:4,draw:(k,t)=>cot(t,{blood:0,servants:true,wrap:L(14,30,k)}),who:'',cap:'Two servants pin him to the cot. The doctor wraps the leg again. Twice as tight.'},
 {d:4.5,draw:(k,t)=>cot(t,{wrap:30,servants:true,baron:true}),who:'The Baron\'s Doctor',cap:'A Charles Horse this severe, untreated… you may never walk again. Paris. Only the surgeons of Paris can save him.'},
 {d:4.5,draw:(k,t)=>cot(t,{wrap:30,baron:true}),who:'Sir Bart',cap:'Don\'t look at him, my boy. Look at me. …Could someone bring the ale over here, then?'},
 {d:4,draw:(k,t)=>{cot(t,{wrap:30,baron:true});sync();g.fillStyle=`rgba(0,0,0,${k})`;g.fillRect(0,0,w,h)},who:'',cap:'In the shadows, someone turns a page in a small black ledger.'}
];C.play(shots,onEnd)}
