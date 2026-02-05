const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Apply character replacements using explicit byte sequences
    content = content.replace(/Ã­/g, 'í');
    content = content.replace(/Ã©/g, 'é');
    content = content.replace(/Ã³/g, 'ó');
    content = content.replace(/Ã¡/g, 'á');
    content = content.replace(/Ã¹/g, 'ù');
    content = content.replace(/Ã±/g, 'ñ');
    content = content.replace(/Ãº/g, 'ú');
    content = content.replace(/Ã"/g, 'Ó');
    content = content.replace(/Ã‰/g, 'É');
    content = content.replace(/Ãš/g, 'Ú');
    content = content.replace(/Ã"ptimo/g, 'Óptimo');
    content = content.replace(/Ã‰xito/g, 'Éxito');
    content = content.replace(/Ãšltima/g, 'Última');
    content = content.replace(/Ãšltimo/g, 'Último');
    content = content.replace(/â†'/g, '→');
    content = content.replace(/Ã—/g, '×');
    content = content.replace(/â¤ï¸/g, '❤️');
    content = content.replace(/ðŸ'ª/g, '💪');
    content = content.replace(/ðŸ‹ï¸/g, '🏋️');
    content = content.replace(/ðŸ¦µ/g, '🦵');
    content = content.replace(/ðŸ"¥/g, '🔥');
    content = content.replace(/ðŸ'­/g, '💭');
    content = content.replace(/ðŸ"Š/g, '📊');
    content = content.replace(/ðŸ†/g, '🏆');
    content = content.replace(/ðŸ§˜/g, '🧘');
    content = content.replace(/ðŸ"ˆ/g, '📈');
    content = content.replace(/ðŸ§±/g, '🧱');
    content = content.replace(/ðŸŽ¯/g, '🎯');
    content = content.replace(/ðŸŽ /g, '🎉');
    content = content.replace(/ðŸš€/g, '🚀');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('✓ ' + path.relative(process.cwd(), filePath));
      return true;
    }
    return false;
  } catch (error) {
    console.error('✗ Error: ' + filePath);
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
    console.error('Directory error: ' + dir);
  }
}

console.log('Fixing encoding issues...\n');

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
