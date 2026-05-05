const fs = require('fs');
const { Transform, Readable } = require('stream');
const path = require('path');

// Read a large file with stream (example uses package sample if present)
function readFileStream(filePath) {
  return new Promise((resolve, reject) => {
    const rs = fs.createReadStream(filePath, { encoding: 'utf8' });
    let collected = '';
    rs.on('data', (chunk) => collected += chunk);
    rs.on('end', () => resolve(collected));
    rs.on('error', reject);
  });
}

// Write data with a writable stream
function writeFileStream(filePath, data) {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(filePath, { encoding: 'utf8' });
    ws.on('finish', resolve);
    ws.on('error', reject);
    ws.write(data);
    ws.end();
  });
}

// Transform stream example: uppercase transform
class UppercaseTransform extends Transform {
  _transform(chunk, enc, cb) {
    cb(null, chunk.toString().toUpperCase());
  }
}

// Custom readable stream that emits numbers
class NumberStream extends Readable {
  constructor(limit = 10, options = {}) {
    super(options);
    this.current = 1;
    this.limit = limit;
  }
  _read() {
    if (this.current > this.limit) return this.push(null);
    this.push(String(this.current));
    this.current += 1;
  }
}

if (require.main === module) (async () => {
  const tmpOut = path.join(__dirname, 'tmp-out.txt');
  await writeFileStream(tmpOut, 'hello\nworld\n');

  const content = await readFileStream(tmpOut);
  console.log('read content:', content.trim());

  // Pipe through transform
  const rs = fs.createReadStream(tmpOut);
  const ws = fs.createWriteStream(path.join(__dirname, 'tmp-out-upper.txt'));
  rs.pipe(new UppercaseTransform()).pipe(ws);

  // Use NumberStream
  const ns = new NumberStream(5);
  ns.on('data', (d) => process.stdout.write(d + ' '));
  ns.on('end', () => process.stdout.write('\n'));
})();

module.exports = { readFileStream, writeFileStream, UppercaseTransform, NumberStream };
