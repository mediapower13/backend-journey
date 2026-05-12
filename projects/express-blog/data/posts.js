let posts = [];
let idCounter = 1;

function getAll() { return posts; }
function get(id) { return posts.find(p => p.id === Number(id)); }
function create(post) { const p = Object.assign({ id: idCounter++ }, post); posts.push(p); return p; }
function update(id, changes) { const p = get(id); if (!p) return null; Object.assign(p, changes); return p; }
function remove(id) { const idx = posts.findIndex(p => p.id === Number(id)); if (idx < 0) return null; return posts.splice(idx,1)[0]; }

function reset() { posts = []; idCounter = 1; }

module.exports = { getAll, get, create, update, remove, reset };
