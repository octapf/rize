const fs = require('fs');
const path = require('path');

const encodingMap = [
  // Already fixed words
  ['ConfiguraciÃ³n', 'Configuración'],
  ['Cerrar SesiÃ³n', 'Cerrar Sesión'],
  ['ContraseÃ±a', 'Contraseña'],
  ['PÃºblico', 'Público'],
  ['PÃºblica', 'Pública'],
  ['EspaÃ±ol', 'Español'],
  ['PortuguÃªs', 'Portugués'],
  ['MÃ©trico', 'Métrico'],
  ['Â¿EstÃ¡s', '¿Estás'],
  ['Â¿QuiÃ©n', '¿Quién'],
  ['Esta acciÃ³n', 'Esta acción'],
  ['serÃ¡n', 'serán'],
  ['Se enviarÃ¡', 'Se enviará'],
  ['FunciÃ³n', 'Función'],
  ['galerÃ­a', 'galería'],
  ['Mostrar EstadÃ­sticas', 'Mostrar Estadísticas'],
  ['CuÃ©ntanos', 'Cuéntanos'],
  ['Cambiar ContraseÃ±a', 'Cambiar Contraseña'],
  ['Elige quiÃ©n', 'Elige quién'],
  ['Perfil PÃºblico', 'Perfil Público'],
  ['Â¡Guardado', '¡Guardado'],
  ['duraciÃ³n', 'duración'],
  ['CapÃ­tulos', 'Capítulos'],
  ['PÃ‰RDIDA', 'PÉRDIDA'],
  ['CompÃ¡ralos', 'Compáralos'],
  ['PÃ©rdida', 'Pérdida'],
  ['RÃ¡pida', 'Rápida'],
  ['dÃ­a', 'día'],
  ['calorÃ­as', 'calorías'],
  ['pÃ©rdida', 'pérdida'],
  ['segÃºn', 'según'],
  ['estimaciÃ³n', 'estimación'],
  ['Ajusta segÃºn', 'Ajusta según'],
  ['trÃ­ceps', 'tríceps'],
  ['jalÃ³n', 'jalón'],
  ['bÃ­ceps', 'bíceps'],
  ['DÃ­a', 'Día'],
  ['Ã©nfasis', 'énfasis'],
  ['cuÃ¡driceps', 'cuádriceps'],
  ['glÃºteos', 'glúteos'],
  ['GlÃºteos', 'Glúteos'],
  ['aÃ±adido', 'añadido'],
  ['MÃ­os', 'Míos'],
  ['tÃ©rminos', 'términos'],
  ['bÃºsqueda', 'búsqueda'],
  ['TÃº', 'Tú'],
  ['Acciones RÃ¡pidas', 'Acciones Rápidas'],
  ['RÃ¡pido', 'Rápido'],
  // New patterns found in files
  ['Ã"ptimo', 'Óptimo'],
  ['Atlético', 'Atlético'],
  ['Ã—', '×'],
  ['â†'', '→'],
  ['ðŸŽ¯', '🎯'],
  ['ðŸ"ˆ', '📈'],
  ['ðŸ§±', '🧱'],
  // Individual character replacements (to catch missed patterns)
  ['Ã­', 'í'],
  ['Ã©', 'é'],
  ['Ã³', 'ó'],
  ['Ã¡', 'á'],
  ['Ã¹', 'ù'],
  ['Â¿', '¿'],
  ['Â¡', '¡'],
  ['Ã±', 'ñ'],
  ['Ãº', 'ú'],
  ['Ã"', 'Ó'],
  ['Ã', 'À'],
  ['Ãƒ', 'Ã'],
  ['Ã„', 'Ä'],
  ['Ã…', 'Å'],
  ['Â', ''],
  ['Ã', ''],
  ['â€¢', '•'],
  ['âš ï¸', '⚠️'],
  ['â†'', '→'],
  ['Ã—', '×'],
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
      // Skip excluded directories
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

console.log('Starting comprehensive UTF-8 encoding fix...\n');

let fixedCount = 0;
const mobileDir = path.join(__dirname, 'mobile');
const srcDir = path.join(__dirname, 'mobile', 'src');

// Process both mobile and mobile/src directories
[mobileDir, srcDir].forEach((dir) => {
  if (fs.existsSync(dir)) {
    walkDirectory(dir, (filePath) => {
      if (processFile(filePath)) {
        fixedCount++;
      }
    });
  }
});

console.log(`\nSummary: Fixed ${fixedCount} files`);
console.log('Done!');
