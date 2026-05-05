const EventEmitter = require('events');

class UserManager extends EventEmitter {
  constructor() {
    super();
    this.users = new Map();
  }

  addUser(user) {
    if (!user || !user.id) throw new Error('User must have an id');
    this.users.set(user.id, user);
    this.emit('add', user);
    return user;
  }

  updateUser(id, changes) {
    const existing = this.users.get(id);
    if (!existing) return null;
    const updated = Object.assign({}, existing, changes);
    this.users.set(id, updated);
    this.emit('update', updated);
    return updated;
  }

  removeUser(id) {
    const user = this.users.get(id);
    if (!user) return null;
    this.users.delete(id);
    this.emit('remove', user);
    return user;
  }
}

// Example usage
if (require.main === module) {
  const um = new UserManager();

  um.on('add', (u) => console.log('added', u));
  um.on('update', (u) => console.log('updated', u));
  um.on('remove', (u) => console.log('removed', u));

  um.once('add', (u) => console.log('one-time add listener:', u.id));

  um.addUser({ id: 'u1', name: 'Alice' });
  um.addUser({ id: 'u2', name: 'Bob' });
  um.updateUser('u1', { name: 'Alice Cooper' });
  um.removeUser('u2');
}

module.exports = UserManager;
