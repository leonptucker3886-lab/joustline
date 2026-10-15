// Opening cutscene: plays before Chapter 1 gameplay.
function openingCut(onEnd){const C=Cut,L=C.L;let g,w,h;const sync=()=>{g=C.g;w=C.w;h=C.h};
function sky(a,b){sync();const s=g.createLinearGradient(0,0,0,h);s.addColorStop(0,a);s.addColorStop(1,b);g.fillStyle=s;g.fillRect(0,0,w,h)}
function chateau(k){sky(`rgb(${L(20,90,k)},${L(20,60,k)},${L(50,95,k)})`,`rgb(${L(60,240,k)},${L(40,150,k)},${L(50,80,k)})`);
 g.fillStyle='#ffd27a';g.beginPath();g.arc(w*.72,L(h*.72,h*.42,k),36,0,7);g.fill();
 const by=h*.62;g.fillStyle='#2a1c2a';g.fillRect(w*.14,by-80,w*.52,80);[.12,.3,.46,.62].forEach(p=>{g.fillRect(w*p,by-130,24,130);g.beginPath();g.moveTo(w*p-6,by-130);g.lineTo(w*p+12,by-170);g.lineTo(w*p+30,by-130);g.fill()});
 g.fillStyle='#4a6a9a';g.fillRect(0,by,w,h*.08);g.fillStyle='#1d2a1a';g.fillRect(0,by+h*.08,w,h)}
function fair(k,t){sky('#5a7aa8','#f0b070');g.fillStyle='#3d5a2a';g.fillRect(0,h*.62,w,h);const off=L(0,-w*.9,k),y=h*.62;
 ['#b03a2e','#2e5fb0','#e8c77a','#7a3ab0','#2e8a5a'].forEach((c,i)=>{const x=off+i*w*.34+10;g.fillStyle=c;g.beginPath();g.moveTo(x,y);g.lineTo(x+w*.14,y-110);g.lineTo(x+w*.28,y);g.fill();g.fillRect(x+w*.14-1,y-140,3,30);g.beginPath();g.moveTo(x+w*.14,y-140);g.lineTo(x+w*.14+24+Math.sin(t*4+i)*5,y-133);g.lineTo(x+w*.14,y-126);g.fill()});
 const wx=off+w*1.75;g.fillStyle='#8a1a3a';g.fillRect(wx,y-90,w*.42,90);C.txt('WINE (free)',wx+w*.21,y-42,'bold 20px Georgia','#fff3c8')}
function tent(z,t,light,sq){sync();g.save();g.translate(w/2,h/2);g.scale(z,z);g.translate(-w/2,-h/2);
 g.fillStyle='#3a2414';g.fillRect(0,0,w,h);g.fillStyle='#6b4423';g.beginPath();g.moveTo(0,h*.18);g.lineTo(w/2,h*.02);g.lineTo(w,h*.18);g.lineTo(w,h);g.lineTo(0,h);g.fill();
 g.fillStyle='#8a6a3a';g.fillRect(w*.48,h*.02,8,h*.5);for(let i=0;i<6;i++){g.save();g.translate(w*.48+4,h*.12+i*20);g.rotate((i%3-1)*.25);g.fillStyle='#efe2b8';g.fillRect(-14,-8,28,15);C.txt('IOU',0,3,'8px Georgia','#7a2d14');g.restore()}
 g.fillStyle='#7a5a3a';g.fillRect(w*.06,h*.54,w*.88,h*.1);g.fillStyle='#a8906a';g.fillRect(w*.05,h*.5,w*.9,h*.07);
 C.fig(w*.24,h*.5,1,'#3f5f8f','#f0c9a0',{rot:-1.3,hair:'#c99a3a'});C.fig(w*.76,h*.5,1,'#6a3f8f','#d8a47e',{rot:-1.75,hair:'#1f140c'});C.fig(w*.5,h*.51,1.15,'#7a1f1f','#e8b890',{rot:-1.57,hair:'#3a2510'});
 g.fillStyle='#c9a227';g.beginPath();g.ellipse(w*.6,h*.47,7,4,0,0,7);g.fill();g.fillStyle='#7a1028';g.beginPath();g.arc(w*.605,h*.49+(t*40)%30,2.5,0,7);g.fill();
 [.24,.5,.76].forEach((p,i)=>{const ph=(t*.7+i*.33)%1;g.globalAlpha=1-ph;C.txt('z',w*p+10+ph*18,h*.42-ph*40,'italic 16px Georgia','#fff');g.globalAlpha=1});
 if(light){g.fillStyle=`rgba(255,220,140,${.5*light})`;g.beginPath();g.moveTo(w*.02,h*.28);g.lineTo(w*.16,h*.28);g.lineTo(w*.55,h);g.lineTo(0,h);g.fill()}
 if(sq)C.fig(w*.12,h*.7,sq,'#4a6b3a','#e9c29a',{hair:'#5a3a1a'});g.restore()}
const shots=[
 {d:4.5,draw:k=>{chateau(k*.4)},cap:'The Loire valley. Spring, 1515.'},
 {d:5,draw:k=>chateau(.4+k*.6),cap:'Tourney day at Amboise. Every knight in France has come to win.'},
 {d:5,draw:(k,t)=>fair(k,t),cap:'One knight has come mostly for the free wine.'},
 {d:5,draw:(k,t)=>tent(L(1,1.15,k),t),cap:'Sir Bart Sheen. The best jouster in France, if you ask him. Noble in name only, and broke in every other way.'},
 {d:4.5,draw:(k,t)=>tent(1.15,t),cap:'His cousin has the gold. Bart has the title, two ladies, and a tent pole covered in IOUs.'},
 {d:4.5,draw:(k,t)=>tent(1.15,t,k,null),cap:'Nobody here will be awake for the first bell. Almost nobody.'},
 {d:5,draw:(k,t)=>tent(L(1.15,1.3,k),t,1,L(.8,1.15,k)),who:'',cap:'His squire. Sixteen, calm as still water. The one thing Bart has never lost at cards.'},
 {d:3.5,draw:k=>{sync();g.fillStyle='#000';g.fillRect(0,0,w,h);g.globalAlpha=Math.min(1,k*2);C.txt('JOUSTLINE',w/2,h*.46,'bold 44px Georgia','#e8c77a');C.txt('Chapter 1 · Morning After',w/2,h*.46+34,'italic 17px Georgia','#f3e6c8');g.globalAlpha=1},cap:''}
];C.play(shots,onEnd)}
