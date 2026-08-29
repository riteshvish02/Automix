const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const srcPath = path.join(src, name);
    const destPath = path.join(dest, name);
    if (fs.statSync(srcPath).isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

const repoRoot = path.join(__dirname, '..');
const srcGen = path.join(repoRoot, 'src', 'generated');
const destGen = path.join(repoRoot, 'dist', 'generated');

copyDir(srcGen, destGen);
console.log('copied', srcGen, '->', destGen);
