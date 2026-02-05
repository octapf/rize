const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // All remaining corrupted emoji patterns
    content = content.replace(/ðŸ'ª/g, '💪');
    content = content.replace(/ðŸ‹ï¸/g, '🏋️');
    content = content.replace(/ðŸ¤¸/g, '🤸');
    content = content.replace(/ðŸ"¥/g, '🔥');
    content = content.replace(/ðŸ'­/g, '💭');
    content = content.replace(/ðŸ"Š/g, '📊');
    content = content.replace(/ðŸ†/g, '🏆');
    content = content.replace(/ðŸŽ¾/g, '🎾');
    content = content.replace(/ðŸŽ/g, '🎯');
    content = content.replace(/ðŸŽ‰/g, '🎉');
    content = content.replace(/ðŸŽ'/g, '🎬');
    content = content.replace(/â–¶ï¸/g, '▶️');
    content = content.replace(/â±ï¸/g, '⏱️');
    content = content.replace(/âœ…/g, '✅');
    content = content.replace(/âœ"/g, '✓');
    content = content.replace(/âœ./g, '✓');
    content = content.replace(/â³/g, '⏳');
    content = content.replace(/â¤ï¸/g, '❤️');
    content = content.replace(/â†'/g, '→');
    content = content.replace(/âš¡/g, '⚡');
    content = content.replace(/âš–ï¸/g, '⚖️');
    content = content.replace(/â­•/g, '⭕');
    content = content.replace(/Ã—/g, '×');
    content = content.replace(/ðŸ˜ž/g, '😞');
    content = content.replace(/ðŸ˜/g, '😐');
    content = content.replace(/ðŸ™‚/g, '🙂');
    content = content.replace(/ðŸ˜ƒ/g, '😃');
    content = content.replace(/ðŸ˜´/g, '😴');
    content = content.replace(/ðŸ"/g, '📔');
    content = content.replace(/ðŸ'"/g, '👓');
    content = content.replace(/ðŸ«€/g, '🫀');
    content = content.replace(/ðŸ''/g, '👑');
    content = content.replace(/ðŸ¤œ/g, '🤜');
    content = content.replace(/ðŸ¤›/g, '🤛');
    content = content.replace(/ðŸ¦¿/g, '🦿');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('✓ ' + path.relative(process.cwd(), filePath));
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

function walkDirectory(dir, callback) {
  try {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const dirName = path.basename(filePath);
        if (!['node_modules', '.git', '.expo', 'dist', 'build', 'coverage'].includes(dirName)) {
          walkDirectory(filePath, callback);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(file);
        if (['.tsx', '.ts', '.jsx', '.js'].includes(ext)) {
          callback(filePath);
        }
      }
    });
  } catch (error) {
    // ignore
  }
}

console.log('Comprehensive emoji and character fix...\n');

let fixedCount = 0;
const mobileDir = path.join(__dirname, 'mobile');

if (fs.existsSync(mobileDir)) {
  walkDirectory(mobileDir, (filePath) => {
    if (processFile(filePath)) {
      fixedCount++;
    }
  });
}

console.log('\nDone! Fixed ' + fixedCount + ' files');
