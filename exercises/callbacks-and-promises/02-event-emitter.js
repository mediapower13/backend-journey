class SimpleEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  off(eventName, callback) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) return;
    this.events[eventName].forEach(callback => {
      callback(...args);
    });
  }

  once(eventName, callback) {
    const wrappedCallback = (...args) => {
      callback(...args);
      this.off(eventName, wrappedCallback);
    };
    this.on(eventName, wrappedCallback);
  }
}

class DataProcessor extends SimpleEventEmitter {
  constructor() {
    super();
    this.data = [];
  }

  addData(item) {
    this.data.push(item);
    this.emit('data:added', item);
  }

  processData(callback) {
    setTimeout(() => {
      try {
        const processed = this.data.map(item => ({
          ...item,
          processed: true,
          timestamp: new Date()
        }));
        this.emit('process:complete', processed);
        if (callback) callback(null, processed);
      } catch (error) {
        this.emit('process:error', error);
        if (callback) callback(error, null);
      }
    }, 1000);
  }

  clearData() {
    this.data = [];
    this.emit('data:cleared');
  }
}

module.exports = {
  SimpleEventEmitter,
  DataProcessor
};
