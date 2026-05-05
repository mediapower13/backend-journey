const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');
const EventEmitter = require('events');

class LineSplitter extends Transform {
  constructor(options = {}) {
    super(Object.assign({ readableObjectMode: true }, options));
    this._buffer = '';
  }
  _transform(chunk, enc, cb) {
    this._buffer += chunk.toString();
    let idx;
    while ((idx = this._buffer.indexOf('\n')) >= 0) {
      const line = this._buffer.slice(0, idx);
      this._buffer = this._buffer.slice(idx + 1);
      if (line.length) this.push(line);
    }
    cb();
  }
  _flush(cb) {
    if (this._buffer && this._buffer.length) this.push(this._buffer);
    cb();
  }
}

class LogProcessor extends EventEmitter {
  constructor() {
    super();
    this.counts = {};
  }

  parseLine(line) {
    // Expected format: ISO TIMESTAMP LEVEL message
    const parts = line.split(' ');
    const time = parts[0];
    const level = parts[1];
    const msg = parts.slice(2).join(' ');
    return { time, level, msg, raw: line };
  }

  processFile(inPath, outPath, minLevel = 'INFO') {
    const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
    const minIdx = levels.indexOf(minLevel);

    const rs = fs.createReadStream(inPath, { encoding: 'utf8' });
    const splitter = new LineSplitter();
    const ws = fs.createWriteStream(outPath, { encoding: 'utf8' });

    rs.pipe(splitter).on('data', (line) => {
      const entry = this.parseLine(line);
      this.emit('entry', entry);
      const idx = levels.indexOf(entry.level);
      if (idx >= minIdx) {
        ws.write(entry.raw + '\n');
        this.counts[entry.level] = (this.counts[entry.level] || 0) + 1;
        this.emit('accepted', entry);
      } else {
        this.emit('filtered', entry);
      }
    });

    return new Promise((resolve, reject) => {
      rs.on('error', reject);
      ws.on('error', reject);
      splitter.on('end', () => {
        ws.end(() => {
          this.emit('done', this.counts);
          resolve(this.counts);
        });
      });
    });
  }
}

// CLI
if (require.main === module) (async () => {
  const input = process.argv[2] || path.join(__dirname, 'sample.log');
  const out = process.argv[3] || path.join(__dirname, 'filtered.log');
  const minLevel = process.argv[4] || 'INFO';

  const lp = new LogProcessor();
  lp.on('entry', (e) => {});
  lp.on('accepted', (e) => {});
  lp.on('filtered', (e) => {});
  lp.on('done', (counts) => console.log('done counts:', counts));

  try {
    const counts = await lp.processFile(input, out, minLevel);
    console.log('Processed. Counts:', counts);
  } catch (err) {
    console.error('Error processing file:', err.message);
  }
})();

module.exports = { LogProcessor, LineSplitter };
