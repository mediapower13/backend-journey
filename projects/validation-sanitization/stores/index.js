class UserStore {
  constructor() {
    this.users = new Map();
    this.nextId = 1;
  }

  findByEmail(email) {
    for (const user of this.users.values()) {
      if (user.email === email) return user;
    }
    return null;
  }

  create(userData) {
    const user = Object.assign({}, userData, { id: this.nextId++ });
    this.users.set(user.id, user);
    return user;
  }

  getAll() {
    return Array.from(this.users.values());
  }

  getById(id) {
    return this.users.get(Number(id)) || null;
  }

  update(id, changes) {
    const existing = this.getById(id);
    if (!existing) return null;
    const updated = Object.assign({}, existing, changes, { id: existing.id });
    this.users.set(existing.id, updated);
    return updated;
  }

  remove(id) {
    const user = this.getById(id);
    if (!user) return null;
    this.users.delete(Number(id));
    return user;
  }
}

class PostStore {
  constructor() {
    this.posts = new Map();
    this.nextId = 1;
  }

  create(postData) {
    const post = Object.assign({}, postData, { id: this.nextId++, createdAt: new Date().toISOString() });
    this.posts.set(post.id, post);
    return post;
  }

  getAll() {
    return Array.from(this.posts.values());
  }

  getById(id) {
    return this.posts.get(Number(id)) || null;
  }

  update(id, changes) {
    const existing = this.getById(id);
    if (!existing) return null;
    const updated = Object.assign({}, existing, changes, { id: existing.id });
    this.posts.set(existing.id, updated);
    return updated;
  }

  remove(id) {
    const post = this.getById(id);
    if (!post) return null;
    this.posts.delete(Number(id));
    return post;
  }
}

const userStore = new UserStore();
const postStore = new PostStore();

module.exports = { UserStore, PostStore, userStore, postStore };
