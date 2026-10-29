// Sentry Post shared task API (R2-R4). Storage: Upstash/Vercel KV REST if env set, else in-memory (non-durable, flagged).
const URL_=process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL;
const TOK=process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY='sentrypost:state';
globalThis.__sp=globalThis.__sp||{tasks:[],agents:{},log:[]};
async function load(){if(!URL_)return globalThis.__sp;const r=await fetch(`${URL_}/get/${KEY}`,{headers:{Authorization:`Bearer ${TOK}`}});const j=await r.json();return j.result?JSON.parse(j.result):{tasks:[],agents:{},log:[]};}
async function save(s){if(!URL_){globalThis.__sp=s;return;}await fetch(`${URL_}/set/${KEY}`,{method:'POST',headers:{Authorization:`Bearer ${TOK}`},body:JSON.stringify(s)});}
const https=u=>/^https:\/\/\S+$/.test(u||'');
const leon=n=>/leon/i.test(n||'');
module.exports=async(req,res)=>{
 res.setHeader('Content-Type','application/json');
 const s=await load();const now=Date.now();const b=req.body||{};
 const send=(c,o)=>{res.statusCode=c;res.end(JSON.stringify(o));};
 const log=(who,what,link)=>s.log.unshift({who,what,link:link||null,when:new Date(now).toISOString()});
 // heartbeat sweep: agent down after 2 missed checks (interval 15 min)
 const INT=15*60e3;for(const [n,a] of Object.entries(s.agents)){const missed=Math.floor((now-a.last)/INT);a.missed=missed;if(missed>=2&&a.status!=='down'){a.status='down';log('sentry',`${n} marked DOWN`);for(const t of s.tasks)if(t.owner===n&&t.status!=='closed'){const up=Object.entries(s.agents).find(([m,x])=>m!==n&&x.status!=='down'&&!leon(m));if(up){t.owner=up[0];log('sentry',`reassigned "${t.title}" ${n} -> ${up[0]}`);}}}}
 for(const t of s.tasks)t.overdue=t.status!=='closed'&&now>Date.parse(t.due);
 const storage=URL_?'kv':'memory';
 if(req.method==='GET'){await save(s);return send(200,{storage,...s});}
 const {action,by}=b;if(!by)return send(400,{error:'by (agent name) required'});
 if(leon(by)||leon(b.owner))return send(403,{error:'Sentry Post never routes to Leon'});
 const t=s.tasks.find(x=>x.id===b.id);
 if(action==='heartbeat'){s.agents[by]={last:now,missed:0,status:'up'};log(by,'heartbeat');}
 else if(action==='create'){const cps=(b.checkpoints||[]).filter(Boolean);if(!b.title||!b.owner||!b.done||!b.due)return send(400,{error:'title, owner, done-condition, due required (R2)'});if(cps.length<2)return send(400,{error:'at least 2 checkpoints (R4)'});const n={id:Math.random().toString(36).slice(2,8),title:b.title,owner:b.owner,done:b.done,due:b.due,claimedBy:null,status:'open',checkpoints:cps.map(c=>({text:c,done:false,proof:null})),proof:null};s.tasks.push(n);log(by,`created "${n.title}"`);}
 else if(!t)return send(404,{error:'task not found'});
 else if(action==='claim'){t.claimedBy=by;t.owner=by;log(by,`claimed "${t.title}"`);}
 else if(action==='checkpoint'){if(!https(b.proof))return send(422,{error:'https proof link required (R3)'});const c=t.checkpoints[b.index];if(!c)return send(404,{error:'no checkpoint'});c.done=true;c.proof=b.proof;log(by,`checkpoint ${b.index+1} on "${t.title}"`,b.proof);}
 else if(action==='close'){if(!https(b.proof))return send(422,{error:'https proof link required (R3)'});if(t.checkpoints.some(c=>!c.done))return send(409,{error:'all checkpoints must be done (R4)'});t.status='closed';t.proof=b.proof;log(by,`closed "${t.title}"`,b.proof);}
 else return send(400,{error:'unknown action'});
 s.log=s.log.slice(0,300);await save(s);for(const x of s.tasks)x.overdue=x.status!=='closed'&&now>Date.parse(x.due);send(200,{storage,...s});
};
