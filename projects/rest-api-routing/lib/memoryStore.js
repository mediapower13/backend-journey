function createMemoryStore(seed = []) {
  const items = new Map();
  let nextId = 1;

  for (const entry of seed) {
    const id = Number(entry.id || nextId++);
    const value = Object.assign({}, entry, { id });
    items.set(id, value);
    if (id >= nextId) nextId = id + 1;
  }

  function list() {
    return Array.from(items.values());
  }

  function get(id) {
    return items.get(Number(id)) || null;
  }

  function create(data) {
    const value = Object.assign({}, data, { id: nextId++ });
    items.set(value.id, value);
    return value;
  }

  function update(id, patch) {
    const current = get(id);
    if (!current) return null;
    const updated = Object.assign({}, current, patch, { id: current.id });
    items.set(current.id, updated);
    return updated;
  }

  function remove(id) {
    const current = get(id);
    if (!current) return null;
    items.delete(current.id);
    return current;
  }

  return { list, get, create, update, remove };
}

module.exports = { createMemoryStore };
