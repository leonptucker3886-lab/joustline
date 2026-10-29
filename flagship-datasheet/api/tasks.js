// Baton Board CP2 API: tasks (R2), proof gate (R3), checkpoints (R4).
// Storage: Upstash Redis REST if KV_REST_API_URL/TOKEN set, else in-memory (dev).
const URL_ = process.env.KV_REST_API_URL, TOK = process.env.KV_REST_API_TOKEN;
let mem = { tasks: [] };
async function load() {
  if (!URL_) return mem;
  const r = await fetch(`${URL_}/get/bb:board`, { headers: { Authorization: `Bearer ${TOK}` } });
  const j = await r.json(); return j.result ? JSON.parse(j.result) : { tasks: [] };
}
async function save(b) {
  if (!URL_) { mem = b; return; }
  await fetch(`${URL_}/set/bb:board`, { method: 'POST', headers: { Authorization: `Bearer ${TOK}` }, body: JSON.stringify(b) });
}
const isUrl = s => /^https:\/\/\S+$/.test(s || '');
const view = t => ({ ...t, overdue: t.status !== 'done' && Date.now() > Date.parse(t.deadline) });
module.exports = async (req, res) => {
  const b = await load(); const body = req.body || {}; const send = (c, o) => res.status(c).json(o);
  if (req.method === 'GET') return send(200, b.tasks.map(view));
  if (req.method !== 'POST') return send(405, { error: 'GET or POST' });
  const { action } = body;
  if (action === 'create') {
    const { title, owner, done_when, deadline, handoff = [], checkpoints = [] } = body;
    if (!title || !owner || !done_when || !deadline) return send(400, { error: 'title, owner, done_when, deadline required' });
    if (isNaN(Date.parse(deadline))) return send(400, { error: 'deadline must be ISO date' });
    if (checkpoints.length < 2) return send(400, { error: 'R4: at least 2 checkpoints required' });
    if (handoff.some(h => /leon/i.test(h))) return send(400, { error: 'handoff line never ends at Leon' });
    const t = { id: Date.now().toString(36), title, owner, done_when, deadline, handoff, status: 'open',
      checkpoints: checkpoints.map(name => ({ name, done: false, proof: null })), proof: null, created: new Date().toISOString() };
    b.tasks.push(t); await save(b); return send(201, view(t));
  }
  const t = b.tasks.find(x => x.id === body.id); if (!t) return send(404, { error: 'no such task' });
  if (action === 'checkpoint') {
    const c = t.checkpoints[body.index]; if (!c) return send(404, { error: 'no such checkpoint' });
    if (!isUrl(body.proof)) return send(422, { error: 'R3: proof URL required' });
    c.done = true; c.proof = body.proof; await save(b); return send(200, view(t));
  }
  if (action === 'done') {
    if (!isUrl(body.proof)) return send(422, { error: 'R3: proof URL required to mark done' });
    if (t.checkpoints.some(c => !c.done)) return send(409, { error: 'R4: all checkpoints must be done first' });
    t.status = 'done'; t.proof = body.proof; t.closed = new Date().toISOString(); await save(b); return send(200, view(t));
  }
  return send(400, { error: 'action must be create | checkpoint | done' });
};
