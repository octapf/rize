/**
 * One-time script to update design tokens across the codebase
 * Run: node scripts/update-design-tokens.js
 */
const fs = require('fs');
const path = require('path');

const mobileDir = path.join(__dirname, '..');
let count = 0;

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== '.expo') walk(full, callback);
    } else if (/\.(tsx?|jsx?)$/.test(f) && !full.includes('update-design-tokens')) {
      callback(full);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  const replacements = [
    [/'10b981'/g, "'9D12DE'"],
    [/'10B981'/g, "'9D12DE'"],
    [/#10b981/g, '#9D12DE'],
    [/#10B981/g, '#9D12DE'],
    [/emerald-500\/20/g, 'primary/20'],
    [/emerald-500\/30/g, 'primary/30'],
    [/emerald-900\/30/g, 'primary/30'],
    [/from-emerald-500/g, 'from-primary'],
    [/to-emerald-500/g, 'to-primary'],
    [/border-emerald-600/g, 'border-primary'],
    [/from-emerald-50/g, 'from-primary/10'],
    [/to-emerald-50/g, 'to-primary/10'],
    [/from-emerald-600/g, 'from-primary'],
    [/to-emerald-700/g, 'to-primary'],
    [/emerald-50/g, 'primary/10'],
    [/emerald-100/g, 'primary/20'],
    [/emerald-200/g, 'primary/20'],
    [/emerald-500/g, 'primary'],
    [/emerald-600/g, 'primary'],
    [/emerald-700/g, 'primary'],
    [/emerald-800/g, 'primary/80'],
    [/emerald-900/g, 'primary/80'],
    [/from-green-50/g, 'from-primary/10'],
    [/to-teal-50/g, 'to-primary/10'],
    [/green-50/g, 'primary/10'],
    [/'emerald'/g, "'primary'"],
    [/"emerald"/g, '"primary"'],
    [/\bemerald\s*:/g, 'primary:'],
    [/rgba\(16, 185, 129,/g, 'rgba(157, 18, 222,'],
    [/\/10b981\//g, '/9D12DE/'],
    [/\/10B981\//g, '/9D12DE/'],
  ];

  for (const [re, replacement] of replacements) {
    content = content.replace(re, replacement);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    count++;
    console.log('Updated:', path.relative(mobileDir, filePath));
  }
}

walk(mobileDir, processFile);
console.log('\nDone. Updated', count, 'files.');
