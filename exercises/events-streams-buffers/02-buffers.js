// Buffers practice: create, write, slice, concat, and JSON conversions
const assert = require('assert');

// Create buffers from string and array
const fromString = Buffer.from('hello world', 'utf8');
const fromArray = Buffer.from([0x68, 0x69]); // 'hi'

// Allocate and write
const buf = Buffer.alloc(16);
buf.write('node', 0, 'utf8');

// Slice and concat
const slice = fromString.slice(0, 5); // 'hello'
const combined = Buffer.concat([slice, Buffer.from(' ', 'utf8'), Buffer.from('buf')]);

// Convert to JSON and back
const json = fromString.toJSON();
const back = Buffer.from(json.data);

// Assertions for quick verification
assert.strictEqual(slice.toString(), 'hello');
assert.strictEqual(combined.toString(), 'hello buf');
assert.strictEqual(back.toString(), fromString.toString());

if (require.main === module) {
  console.log('fromString:', fromString.toString());
  console.log('fromArray:', fromArray.toString());
  console.log('written buf:', buf.toString().trim());
  console.log('slice:', slice.toString());
  console.log('combined:', combined.toString());
  console.log('json roundtrip:', back.toString());
}

module.exports = { fromString, fromArray, buf, slice, combined, back };
