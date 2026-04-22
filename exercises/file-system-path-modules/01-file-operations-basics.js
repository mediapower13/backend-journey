const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const sourceFile = path.join(dataDir, 'sample.txt');
const targetFile = path.join(dataDir, 'sample-copy.txt');
const renamedFile = path.join(dataDir, 'sample-renamed.txt');

function ensureDataDirectory() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log('Created data directory:', dataDir);
  }
}

function runFileOperations() {
  ensureDataDirectory();

  fs.writeFileSync(sourceFile, 'Hello from File Operations Basics\n', 'utf8');
  console.log('Wrote file:', sourceFile);

  const content = fs.readFileSync(sourceFile, 'utf8');
  console.log('Read content:', content.trim());

  const exists = fs.existsSync(sourceFile);
  console.log('Source file exists:', exists);

  fs.copyFileSync(sourceFile, targetFile);
  console.log('Copied file to:', targetFile);

  fs.renameSync(targetFile, renamedFile);
  console.log('Renamed copied file to:', renamedFile);

  const stats = fs.statSync(sourceFile);
  console.log('File size in bytes:', stats.size);
  console.log('Created at:', stats.birthtime.toISOString());

  fs.unlinkSync(renamedFile);
  console.log('Deleted renamed copy:', renamedFile);
}

runFileOperations();
