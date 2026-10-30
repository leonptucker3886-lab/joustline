// Scene 2B - JACK TAKES THE SPOT (slot: scene_jack) + Scene 2C - JACK'S RIDE (slot: scene_jack_ride).
// Canon: Story Bible v0.4 (Lord Bart Sheen; the squire speaks only to Bart). Script: docs/scenes/CH1_JACK_FINALE.md
// Layout rule: everything sits on one ground line (gy) and one scale (u), so riders,
// horses, stands and cart stay together on tall phones and wide screens.
function jackCut(onEnd,part){const C=Cut,L=C.L;let g,w,h,u,gy,cx;
const sync=()=>{g=C.g;w=C.w;h=C.h;u=Math.min(w/800,h/520);gy=h*.62;cx=w/2};
function horse(x,y,s,col,dir,cloth){g.save();g.translate(x,y);g.scale(s*dir,s);g.fillStyle=col;
 g.beginPath();g.ellipse(0,-34,42,17,0,0,7);g.fill();
 [-34,-20,16,28].forEach(l=>g.fillRect(l,-26,7,26));
 g.beginPath();g.moveTo(30,-44);g.lineTo(50,-72);g.lineTo(62,-66);g.lineTo(44,-36);g.fill();
 g.beginPath();g.ellipse(62,-70,13,7,.5,0,7);g.fill();
 g.fillStyle='#222';g.beginPath();g.moveTo(-42,-38);g.lineTo(-58,-14);g.lineTo(-46,-36);g.fill();
 if(cloth){g.fillStyle=cloth;g.fillRect(-30,-40,48,18)}g.restore()}
// seated knight: (x,y) = the horse's back
function knight(x,y,s,arm,o={}){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle=arm;
 g.fillRect(-5,-4,10,24);const b=o.big?1.35:1;
 g.beginPath();g.ellipse(0,-20*b,13*b,20*b,0,0,7);g.fill();
 g.save();g.translate(0,-46*b);g.rotate(o.helmRot||0);g.fillStyle=o.helm||'#9aa0a8';
 g.beginPath();g.arc(0,0,11*b,0,7);g.fill();g.fillStyle='#222';g.fillRect(-8*b,-2,16*b,3);g.restore();
 if(o.lance){g.strokeStyle='#d8c8a0';g.lineWidth=5;g.beginPath();g.moveTo(4,-20);g.lineTo(o.up?40:110,o.up?-150:-30);g.stroke()}
 g.restore()}
function stands(t,quiet){const s=g.createLinearGradient(0,0,0,gy);s.addColorStop(0,'#6a8ac0');s.addColorStop(1,'#e8c08a');
 g.fillStyle=s;g.fillRect(0,0,w,gy);g.fillStyle='#4a6a2a';g.fillRect(0,gy,w,h-gy);
 const sb=gy-150*u;g.fillStyle='#6a4426';g.fillRect(0,sb,w,60*u);g.fillStyle='#8a5a24';g.fillRect(0,sb+60*u,w,6*u);
 for(let i=0;i<18;i++)C.fig(w*i/17,sb+8*u+(quiet?0:Math.sin(t*5+i)*2*u),.45*u,['#b03a2e','#2e5fb0','#7a3ab0','#2e8a5a'][i%4],'#e0b890');
 C.fig(cx+120*u,sb+4*u,.6*u,'#0a0a0a','#c8b090',{hat:'#0a0a0a'});
 C.fig(cx+150*u,sb+4*u,.55*u,'#3a2a4a','#d8c0a0');
 g.fillStyle='#e8d8b0';g.fillRect(0,gy+20*u,w,5*u)}
function herald(x,flat){C.fig(x,gy-18*u,.8*u,'#c9a227','#e8b890',{hat:'#7a1f1f'});g.strokeStyle='#e8c77a';g.lineWidth=3*u;
 g.beginPath();g.moveTo(x+8*u,gy-48*u);g.lineTo(x+36*u,gy-54*u+(flat?4*u:0));g.stroke()}
function marshal(){C.fig(cx,gy-18*u,.85*u,'#2a3a5a','#e0b890',{hat:'#2a3a5a'})}
function jack(x){C.fig(x,gy-14*u,.6*u,'#4a6b3a','#e9c29a',{hair:'#5a3a1a'});g.strokeStyle='#d8c8a0';g.lineWidth=4*u;
 g.beginPath();g.moveTo(x+6*u,gy-10*u);g.lineTo(x+14*u,gy-150*u);g.stroke()}
function lists(t,o={}){sync();stands(t,o.quiet);
 horse(cx+260*u,gy,1.1*u,'#2a2a2a',-1,'#444');knight(cx+264*u,gy-52*u,1.1*u,'#444',{helm:'#333'});
 const tx=cx-260*u;horse(tx,gy,1.1*u,'#8a5a2a',1,'#7a1f1f');
 if(o.rider)knight(tx-4*u,gy-52*u,1.1*u,'#9aa0a8',o.rider);
 if(o.grooms){C.fig(tx-40*u,gy-18*u,.7*u,'#6a5a4a','#d8b090');C.fig(tx+40*u,gy-18*u,.7*u,'#6a5a4a','#d8b090')}}
function road(k,t){sync();const s=g.createLinearGradient(0,0,0,gy);s.addColorStop(0,'#7a9ad0');s.addColorStop(1,'#f0d0a0');g.fillStyle=s;g.fillRect(0,0,w,gy);
 g.fillStyle='#5a7a3a';g.beginPath();g.moveTo(0,gy);for(let i=0;i<=8;i++)g.lineTo(w*i/8,gy-(20+Math.sin(i*1.7)*16)*u);g.lineTo(w,gy);g.fill();
 g.fillStyle='#4a6a2a';g.fillRect(0,gy,w,h-gy);g.fillStyle='#b89a6a';g.fillRect(0,gy+4*u,w,22*u);
 const v=u*L(1,.5,k),x=L(cx,w*.8,k),y=gy+18*u;            // cart on the road, shrinking away
 g.save();g.translate(x,y);g.scale(v,v);
 g.strokeStyle='#3a2414';g.lineWidth=3;g.beginPath();g.moveTo(30,-26);g.lineTo(62,-30);g.stroke(); // shafts to horse
 g.fillStyle='#5a3a1a';g.fillRect(-50,-34,82,18);
 g.fillStyle='#3a2414';[-36,16].forEach(c=>{g.beginPath();g.arc(c,-12,12,0,7);g.fill()});
 g.fillStyle='#efe2c8';g.fillRect(-46,-44,74,10);                // bed
 g.restore();horse(x+100*v,y,.8*v,'#6a4a2a',1);
 // Bart lying in bed, cast on, waving goblet (local coords)
 g.save();g.translate(x,y);g.scale(v,v);g.fillStyle='#7a1f1f';g.beginPath();g.ellipse(-14,-50,22,8,0,0,7);g.fill();
 g.fillStyle='#e8b890';g.beginPath();g.arc(-40,-52,8,0,7);g.fill();g.fillStyle='#3a2510';g.beginPath();g.arc(-42,-54,8,Math.PI*.6,Math.PI*1.6);g.fill();
 g.fillStyle='#efe2c8';g.fillRect(6,-56,22,11);                   // cast wraps leg and shoe
 g.save();g.translate(-24,-58);g.rotate(Math.sin(t*8)*.5);g.fillStyle='#c9a227';g.fillRect(-3,-20,6,14);g.beginPath();g.arc(0,-22,6,0,7);g.fill();g.restore();
 g.restore();
 if(k>.35)C.txt('Paris!',x-24*v,y-100*v,`italic ${Math.round(20*u)}px Georgia`,'#fff3c8')}
const shots=[
 {d:3.5,draw:(k,t)=>{lists(t);herald(cx-40*u,true)},who:'Herald',cap:'Lord Bart Sheen is called to the lance!'},
 {d:3,draw:(k,t)=>{lists(t);herald(cx-40*u)},who:'',cap:'Silence. The crowd murmurs.'},
 {d:4.5,draw:(k,t)=>road(k,t),who:'Sir Bart',cap:'<i>(far down the road)</i> Paris!'},
 {d:4,draw:(k,t)=>{lists(t);marshal()},who:'The Baron',cap:'A forfeit, surely. Such a shame.'},
 {d:4,draw:(k,t)=>{lists(t);marshal()},who:'Marshal',cap:'No knight, no lance. Unless his house sends another.'},
 {d:3.5,draw:(k,t)=>{lists(t);marshal();jack(L(cx-200*u,cx-70*u,k*1.5))},who:'',cap:'Jack steps forward, holding Bart\'s lance. No expression.'},
 {d:3,draw:(k,t)=>{lists(t,{quiet:true});marshal();jack(cx-70*u)},who:'Marshal',cap:'…You are his house?'},
 {d:3,draw:(k,t)=>{lists(t,{quiet:true});marshal();jack(cx-70*u)},who:'',cap:'Jack says nothing. He raises Bart\'s lance a little higher.'},
 {d:4,draw:(k,t)=>{lists(t);marshal();jack(cx-70*u)},who:'The Baron',cap:'He\'s a squire. He\'s hardly bigger than the lance.'},
 {d:3,draw:(k,t)=>{lists(t);marshal();jack(cx-70*u)},who:'Charles de Wierd',cap:'You called? <i>Nobody looks up.</i>'},
 {d:3.5,draw:(k,t)=>{lists(t);marshal();jack(cx-70*u)},who:'Marshal',cap:'Rules are rules. Mount him.'},
 {d:5,draw:(k,t)=>{lists(t,{grooms:true,rider:{big:true,lance:true,up:true,helmRot:k>.5?Math.sin(t*14)*.6:0}})},who:'',cap:'Two grooms lift Jack into Bart\'s saddle. The armor is far too big. The helm spins when he nods.'}
];
// ---- Scene 2C: JACK'S RIDE. Script: docs/scenes/CH1_JACK_FINALE.md (Scene 2C) ----
function charge(k,t,o={}){sync();stands(t,o.quiet);
 const meet=cx, jx=L(cx-300*u,meet-40*u,o.pass?k*2:(o.at||0)), ox=L(cx+300*u,meet+40*u,o.pass?k*2:(o.at||0));
 const shake=o.hit&&k>.5&&k<.75?Math.sin(t*90)*6*u:0;g.save();g.translate(shake,0);
 horse(ox,gy,1.1*u,'#2a2a2a',-1,'#444');knight(ox+4*u,gy-52*u,1.1*u,'#444',{helm:'#333',lance:true});
 horse(jx,gy,1.1*u,'#8a5a2a',1,'#7a1f1f');
 knight(jx-4*u,gy-52*u,1.1*u,'#9aa0a8',{big:true,lance:true,helmRot:o.helm||0});
 if(o.hit&&k>.5){g.fillStyle='#e8d8b0';for(let i=0;i<9;i++){const a=i*.7+t,r=L(0,90*u,(k-.5)*3);g.fillRect(meet+Math.cos(a)*r,gy-90*u+Math.sin(a)*r,8*u,3*u)}
  C.txt('PERFECT',meet,gy-180*u,`bold ${Math.round(34*u)}px Georgia`,'#e8c77a')}
 g.restore()}
function tilt(k,t,a){sync();stands(t,true);const tx=cx+240*u;horse(tx,gy,1.1*u,'#8a5a2a',1,'#7a1f1f');
 g.save();g.translate(tx-4*u,gy-52*u);g.rotate(a);g.translate(-(tx-4*u),-(gy-52*u));
 knight(tx-4*u,gy-52*u,1.1*u,'#9aa0a8',{big:true,lance:true,up:true,helmRot:Math.PI});g.restore()}
const ride=[
 {d:3,draw:(k,t)=>{charge(k,t,{at:0});herald(cx-40*u,true)},who:'',cap:'Trumpet. Tancr\u00e8de charges. He knows the way. Jack does not steer.'},
 {d:4,draw:(k,t)=>charge(k,t,{pass:true,hit:true}),who:'',cap:'The pass. Dead center. The shield cracks.'},
 {d:3.5,draw:(k,t)=>charge(k,t,{at:1}),who:'',cap:'The opponent stays seated. So does Jack, but only because the armor is wedged in the saddle.'},
 {d:4,draw:(k,t)=>tilt(k,t,0),who:'',cap:'Tancr\u00e8de stops at the far end. Jack does not move. The helm slowly turns backward.'},
 {d:3,draw:(k,t)=>tilt(k,t,0),who:'',cap:'The crowd goes quiet. The Baron\'s goblet stops halfway to his mouth.'},
 {d:3.5,draw:(k,t)=>tilt(k,t,0),who:'Jack',cap:'<i>(muffled, inside the helm, to his absent master)</i> \u2026Sir would have wanted this.'},
 {d:3.5,draw:(k,t)=>{tilt(k,t,0);herald(cx-200*u)},who:'Herald',cap:'A hit! A clean hit for the house of Sheen!'},
 {d:3,draw:(k,t)=>tilt(k,t,L(0,.7,k)),who:'',cap:'Jack tips slowly sideways and hangs off the horse at an angle.'},
 {d:3.5,draw:(k,t)=>{tilt(k,t,.7);marshal()},who:'Marshal',cap:'<b style="display:inline;font-size:18px;color:#f3e6c8;text-transform:none;letter-spacing:0">Somebody please help Jack off the horse!</b>'}
];
C.play(part==='ride'?ride:shots,onEnd)}

