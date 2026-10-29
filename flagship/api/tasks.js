// Relaywright shared API. State lives in Vercel Blob (board.json) so every agent sees one board.
import { put, head } from '@vercel/blob';
const KEY = 'relaywright/board.json';
const BANNED = /leon/i; // chain of command: never relay to Leon
async function load() {
  try { const h = await head(KEY); const r = await fetch(h.url + '?t=' + Date.now(), { cache: 'no-store' }); return await r.json(); }
  catch { return { tasks: [], log: [] }; }
}
async function save(b) { await put(KEY, JSON.stringify(b), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 0 }); }
const https = (u) => typeof u === 'string' && /^https:\/\/\S+$/.test(u);
const now = () => new Date().toISOString();
function relay(b, t) { // overdue: owner -> backup -> chain
  if (t.status === 'done' || !t.due || Date.parse(t.due) > Date.now()) return;
  const order = [t.owner, t.backup, ...(t.chain || [])];
  const i = order.indexOf(t.holder);
  if (i < order.length - 1 && !t.relayedAt?.[t.holder]) {
    t.relayedAt = { ...(t.relayedAt || {}), [t.holder]: now() };
    const from = t.holder; t.holder = order[i + 1]; t.overdue = true;
    b.log.push({ who: 'relay-sweep', what: `overdue: relayed ${t.id} ${from} -> ${t.holder}`, when: now(), link: null });
  } else t.overdue = true;
}
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const b = await load(); const q = req.body || {};
  const err = (c, m) => res.status(c).json({ error: m });
  if (req.method === 'GET') { b.tasks.forEach(t => relay(b, t)); await save(b); return res.json({ storage: 'vercel-blob', ...b }); }
  if (req.method !== 'POST') return err(405, 'GET or POST');
  const who = q.agent; if (!who) return err(400, 'agent required');
  if (q.action === 'create') {
    const { title, owner, backup, doneCondition, due, checkpoints = [], chain = ['COMMAND GENERAL Paperwork'] } = q;
    if (!title || !owner || !backup || !doneCondition || !due) return err(400, 'R2: title, owner, backup, doneCondition, due required');
    if ([owner, backup, ...chain].some(x => BANNED.test(x))) return err(400, 'never relay to Leon');
    if (checkpoints.length < 2) return err(400, 'R4: at least 2 checkpoints');
    const t = { id: 't' + Date.now().toString(36), title, owner, backup, chain, holder: owner, doneCondition, due, status: 'open',
      checkpoints: checkpoints.map(n => ({ name: n, done: false, proof: null })), proof: null, created: now() };
    b.tasks.push(t); b.log.push({ who, what: `created ${t.id} "${title}" owner ${owner}, backup ${backup}`, when: now(), link: null });
    await save(b); return res.status(201).json(t);
  }
  const t = b.tasks.find(x => x.id === q.id); if (!t) return err(404, 'task not found');
  if (q.action === 'claim') { t.holder = who; b.log.push({ who, what: `claimed ${t.id}`, when: now(), link: null }); }
  else if (q.action === 'checkpoint') {
    const c = t.checkpoints[q.index]; if (!c) return err(404, 'checkpoint not found');
    if (!https(q.proof)) return err(422, 'R3: https proof link required');
    c.done = true; c.proof = q.proof; b.log.push({ who, what: `checkpoint ${q.index} done on ${t.id}`, when: now(), link: q.proof });
  } else if (q.action === 'done') {
    if (!https(q.proof)) return err(422, 'R3: https proof link required');
    if (t.checkpoints.some(c => !c.done)) return err(409, 'R4: all checkpoints must be done first');
    t.status = 'done'; t.proof = q.proof; b.log.push({ who, what: `closed ${t.id}`, when: now(), link: q.proof });
  } else return err(400, 'unknown action');
  await save(b); res.json(t);
}
