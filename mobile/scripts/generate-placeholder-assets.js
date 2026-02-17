/**
 * Generates placeholder icon and splash images (primary #9D12DE).
 * Run: npm run generate-assets
 * Requires: npm install (pngjs is a devDependency)
 */
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
// RIZE brand color (primary #9D12DE)
const R = 157;
const G = 18;
const B = 222;
const A = 255;

function fillWithColor(png, r, g, b, a) {
  for (let y = 0; y < png.height; y++) {
    for (let x = 0; x < png.width; x++) {
      const idx = (png.width * y + x) << 2;
      png.data[idx] = r;
      png.data[idx + 1] = g;
      png.data[idx + 2] = b;
      png.data[idx + 3] = a;
    }
  }
}

function writePng(filename, width, height) {
  const png = new PNG({ width, height });
  fillWithColor(png, R, G, B, A);
  const outPath = path.join(ASSETS_DIR, filename);
  const ws = fs.createWriteStream(outPath);
  png.pack().pipe(ws);
  return new Promise((resolve, reject) => {
    ws.on('finish', () => {
      console.log('Created', outPath);
      resolve();
    });
    ws.on('error', reject);
  });
}

async function main() {
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
  }

  await Promise.all([
    writePng('icon.png', 1024, 1024),
    writePng('splash.png', 1284, 2778),
    writePng('adaptive-icon.png', 1024, 1024),
    writePng('favicon.png', 48, 48),
  ]);

  console.log('Placeholder assets generated in assets/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
