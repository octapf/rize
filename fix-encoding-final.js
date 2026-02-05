const fs = require('fs');
const path = require('path');

const encodingMap = [
  ['ConfiguraciÃ³n', 'Configuración'],
  ['Cerrar SesiÃ³n', 'Cerrar Sesión'],
  ['ContraseÃ±a', 'Contraseña'],
  ['PÃºblico', 'Público'],
  ['EspaÃ±ol', 'Español'],
  ['PortuguÃªs', 'Portugués'],
  ['MÃ©trico', 'Métrico'],
  ['EstadÃ­sticas', 'Estadísticas'],
  ['trÃ­ceps', 'tríceps'],
  ['jalÃ³n', 'jalón'],
  ['bÃ­ceps', 'bíceps'],
  ['cuÃ¡driceps', 'cuádriceps'],
  ['glÃºteos', 'glúteos'],
  ['GlÃºteos', 'Glúteos'],
  ['Ã©nfasis', 'énfasis'],
  ['dÃ­a', 'día'],
  ['DÃ­a', 'Día'],
  ['Ã"ptimo', 'Óptimo'],
  ['Ã­', 'í'],
  ['Ã©', 'é'],
  ['Ã³', 'ó'],
  ['Ã¡', 'á'],
  ['Ã¹', 'ù'],
  ['Ã±', 'ñ'],
  ['Ãº', 'ú'],
  ['Ã"', 'Ó'],
];

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const [incorrect, correct] of encodingMap) {
      if (content.includes(incorrect)) {
        content = content.split(incorrect).join(correct);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Fixed: ${filePath}`);
    }

    return modified;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}: ${error.message}`);
    return false;
  }
}

function walkDirectory(dir, callback) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const dirName = path.basename(filePath);
      if (['node_modules', '.git', '.expo', 'dist', 'build', 'coverage'].includes(dirName)) {
        return;
      }
      walkDirectory(filePath, callback);
    } else if (stat.isFile()) {
      const ext = path.extname(file);
      if (['.tsx', '.ts', '.jsx', '.js'].includes(ext)) {
        callback(filePath);
      }
    }
  });
}

console.log('Starting UTF-8 encoding fix...\n');

let fixedCount = 0;
const mobileDir = path.join(__dirname, 'mobile');

if (fs.existsSync(mobileDir)) {
  walkDirectory(mobileDir, (filePath) => {
    if (processFile(filePath)) {
      fixedCount++;
    }
  });
}

console.log(`\nSummary: Fixed ${fixedCount} files`);
console.log('Done!');
