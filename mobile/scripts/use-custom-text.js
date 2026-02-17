/**
 * Replaces react-native Text with @/components/ui/Text for proper Spanish character support.
 * Run: node scripts/use-custom-text.js
 */
const fs = require('fs');
const path = require('path');

const mobileDir = path.join(__dirname, '..');
const customTextImport = "import { Text } from '@/components/ui/Text';";
let count = 0;

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!['node_modules', '.expo', '.git'].includes(f)) walk(full, callback);
    } else if (/\.(tsx?|jsx?)$/.test(f) && !f.includes('use-custom-text')) {
      callback(full);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Skip if already uses our Text
  if (content.includes("from '@/components/ui/Text'") || content.includes('from "@/components/ui/Text"')) {
    return;
  }

  // Pattern: import { X, Text, Y } from 'react-native'
  const rnImportRegex = /import\s*\{([^}]*)\}\s*from\s*['"]react-native['"]/;
  const match = content.match(rnImportRegex);
  if (!match) return;

  const imports = match[1];
  if (!imports.includes('Text')) return;

  const newImports = imports
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s && s !== 'Text');
  const newRnImport =
    newImports.length > 0
      ? `import { ${newImports.join(', ')} } from 'react-native'`
      : null;

  if (newRnImport) {
    content = content.replace(rnImportRegex, newRnImport + ';');
  } else {
    content = content.replace(rnImportRegex, '');
  }

  // Add our Text import after the first import block
  const firstImportEnd = content.indexOf(';', content.indexOf('import'));
  const insertPos = firstImportEnd + 1;
  const before = content.slice(0, insertPos);
  const after = content.slice(insertPos);
  const hasNewline = after.startsWith('\n');
  content = before + (hasNewline ? '\n' + customTextImport : '\n' + customTextImport) + after;

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    count++;
    console.log('Updated:', path.relative(mobileDir, filePath));
  }
}

walk(mobileDir, processFile);
console.log('\nDone. Updated', count, 'files.');
