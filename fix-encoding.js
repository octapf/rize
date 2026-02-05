const fs = require('fs');
const path = require('path');

const encodingMap = [
  // Main word patterns
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
  // Additional character variations
  ['Ã­', 'í'],
  ['Ã©', 'é'],
  ['Ã³', 'ó'],
  ['Ã¡', 'á'],
  ['Ã¹', 'ù'],
  ['Â¿', '¿'],
  ['Â¡', '¡'],
  ['Ã±', 'ñ'],
  ['Ãº', 'ú'],
  ['â€¢', '•'],
  ['âš ï¸', '⚠️'],
  ['ÂÂ¿', '¿'],
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
      console.log('✓ Fixed: ' + filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('✗ Error: ' + filePath);
    return false;
  }
}

function processDirectory(dirPath) {
  let totalFiles = 0;
  let fixedFiles = 0;

  function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        if (!['node_modules', '.git', '.expo', 'dist', 'build'].includes(file)) {
          walk(filePath);
        }
      } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
        totalFiles++;
        if (processFile(filePath)) {
          fixedFiles++;
        }
      }
    });
  }

  walk(dirPath);
  console.log('\nSummary: Fixed ' + fixedFiles + ' out of ' + totalFiles + ' files');
}

const mobileDir = path.join(__dirname, 'mobile');

if (!fs.existsSync(mobileDir)) {
  console.error('Mobile directory not found');
  process.exit(1);
}

console.log('Starting UTF-8 encoding fix...\n');
processDirectory(mobileDir);
console.log('\nDone!');
