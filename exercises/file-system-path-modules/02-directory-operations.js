const fs = require('fs');
const path = require('path');

const workspace = path.join(__dirname, 'workspace');
const nestedDir = path.join(workspace, 'logs', 'daily');
const notesFile = path.join(workspace, 'notes.txt');
const reportFile = path.join(workspace, 'report.md');

function createDirectoryStructure() {
  fs.mkdirSync(nestedDir, { recursive: true });
  fs.writeFileSync(notesFile, 'Notes file\n', 'utf8');
  fs.writeFileSync(reportFile, '# Report\n', 'utf8');
  fs.writeFileSync(path.join(nestedDir, '2026-04-23.log'), 'log entry\n', 'utf8');
}

function listDirectoryContents(dirPath) {
  const entries = fs.readdirSync(dirPath);
  console.log('Directory contents of', dirPath);
  entries.forEach((entry) => console.log('-', entry));
}

function findFilesByExtension(dirPath, extension, result = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      findFilesByExtension(fullPath, extension, result);
    } else if (entry.isFile() && path.extname(entry.name) === extension) {
      result.push(fullPath);
    }
  }

  return result;
}

function generateDirectoryTree(dirPath, indent = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const marker = entry.isDirectory() ? '[D]' : '[F]';
    console.log(`${indent}${marker} ${entry.name}`);

    if (entry.isDirectory()) {
      generateDirectoryTree(path.join(dirPath, entry.name), `${indent}  `);
    }
  }
}

function runDirectoryOperations() {
  createDirectoryStructure();

  listDirectoryContents(workspace);

  const mdFiles = findFilesByExtension(workspace, '.md');
  console.log('Markdown files:', mdFiles);

  console.log('Directory tree:');
  generateDirectoryTree(workspace);

  fs.rmSync(workspace, { recursive: true, force: true });
  console.log('Deleted directory recursively:', workspace);
}

runDirectoryOperations();
