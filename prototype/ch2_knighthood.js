// CH2 Scene 1 — Forced Knighthood (slot ch2_knighthood). Script: scripts/ch2/01_forced_knighthood.md (Bible v0.4).
// Usage: Ch2Knighthood.play(()=>goTo('ch2_jousts'))
window.Ch2Knighthood=(function(){
const C=window.Cut;
function hall(){const g=C.g,w=C.w,h=C.h;g.fillStyle='#3a2a1c';g.fillRect(0,0,w,h);g.fillStyle='#5a4128';g.fillRect(0,h*.62,w,h*.38);
 g.fillStyle='#7a1f1f';g.fillRect(w*.12,h*.18,w*.08,h*.34);g.fillRect(w*.8,h*.18,w*.08,h*.34);
 g.fillStyle='#c9d6e3';g.fillRect(w*.44,h*.2,w*.12,h*.42);}
function horse(x,y,s,snort){const g=C.g;g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='#6b4a2b';g.beginPath();g.ellipse(0,0,40,18,0,0,7);g.fill();
 g.beginPath();g.ellipse(-38,-20,10,20,-.6,0,7);g.fill();g.fillRect(-30,10,6,26);g.fillRect(24,10,6,26);
 if(snort){g.fillStyle='rgba(240,240,240,.6)';g.beginPath();g.arc(-56,-8,6,0,7);g.arc(-64,-4,4,0,7);g.fill()}g.restore()}
function jack(x,y,s,o={}){const g=C.g;C.fig(x,y,s,'#8a8f96','#8a8f96');g.save();g.translate(x,y);g.scale(s,s);
 g.fillStyle='#6d7279';g.fillRect(o.slip?-24:-20,o.slip?4:-26,12,10);g.fillStyle='#222';g.fillRect(-7,o.visorUp?-44:-37,14,3);g.restore()}
function baron(x,y,s,sword){C.fig(x,y,s,'#4b2a6a','#e2c09c',{hat:'#2a1a3a'});if(sword){const g=C.g;g.strokeStyle='#d8d8d8';g.lineWidth=3;g.beginPath();g.moveTo(x+14*s,y-10*s);g.lineTo(x+14*s+sword[0],y-10*s+sword[1]);g.stroke()}}
const W=()=>C.w,H=()=>C.h,B='Baron of Vaudrecourt';
const two=()=>{hall();jack(W()*.42,H()*.62,1.4,{slip:1});baron(W()*.6,H()*.62,1.3)};
const shots=[
 {d:4.5,who:B,cap:'"By the power of whoever is watching... arise, Sir Jack."',draw(k){hall();jack(W()*.42,H()*.62,1.4);baron(W()*.6,H()*.62,1.3,[-40,-60+C.L(0,20,k)])}},
 {d:3,cap:'*clank*',draw(k){hall();jack(W()*.42,H()*.62,1.4,{slip:k>.4});baron(W()*.6,H()*.62,1.3,[-50,10])}},
 {d:2.5,cap:'',draw(){hall();jack(W()*.5,H()*.6,2)}},
 {d:5,who:B,cap:'"Jack. That\'s what my cousin calls you, isn\'t it? It will do."',draw:two},
 {d:4.5,who:B,cap:'"You\'ll ride in Lord Bart Sheen\'s armor. On Lord Bart Sheen\'s horse."',draw:two},
 {d:3,cap:'Tancrede snorts.',draw(k){hall();horse(W()*.5,H()*.55,1.3,k>.5)}},
 {d:4.5,who:B,cap:'"New armor costs money. Money is for people who have it."',draw:two},
 {d:4.5,who:'Steward',cap:'"Your pay, Sir Jack. Minus the Baron\'s half."',draw(k){hall();jack(W()*.38,H()*.62,1.4,{slip:1});C.fig(W()*.56,H()*.62,1.2,'#50604a','#e2c09c');C.g.fillStyle='#efe2c0';C.g.fillRect(W()*.56-20,H()*.62-20,40,C.L(4,60,k))}},
 {d:3.5,cap:'',draw:two},
 {d:5.5,who:B,cap:'"Half for me, half for you. Perfectly fair." ... "My half is the bigger half."',draw:two},
 {d:3.5,who:'Charles de Wierd',cap:'"Congratulations, Sir Jack!"',draw(){hall();jack(W()*.38,H()*.62,1.4,{slip:1});baron(W()*.56,H()*.62,1.3);C.fig(W()*.74,H()*.6,.9,'#a07a2a','#e2c09c',{hair:'#5a3a1a'})}},
 {d:4,cap:'',draw(k){hall();jack(W()*.5,H()*.6,2,{slip:1,visorUp:k>.2&&k<.75})}}
];
return{slot:'ch2_knighthood',next:'ch2_jousts',play(onEnd){C.play(shots,onEnd)}};
})();
