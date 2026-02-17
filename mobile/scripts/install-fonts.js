/**
 * Automatically downloads and installs Poppins, Inter, and Montserrat fonts
 * Run: npm run install-fonts
 * Note: @expo-google-fonts packages are preferred; this script is for manual/offline use.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const FONTS_DIR = path.join(__dirname, '..', 'assets', 'fonts');

// Google Fonts CDN URLs (for manual install; app uses @expo-google-fonts)
const FONT_URLS = {
  'Poppins-Bold.ttf': 'https://github.com/google/fonts/raw/main/ofl/poppins/Poppins%5BBold%5D.ttf',
  'Poppins-SemiBold.ttf': 'https://github.com/google/fonts/raw/main/ofl/poppins/Poppins%5BSemiBold%5D.ttf',
  'Inter-Regular.ttf': 'https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Regular.ttf',
  'Inter-Medium.ttf': 'https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Medium.ttf',
  'Inter-SemiBold.ttf': 'https://github.com/rsms/inter/raw/master/docs/font-files/Inter-SemiBold.ttf',
  'Montserrat-Medium.ttf': 'https://github.com/google/fonts/raw/main/ofl/montserrat/Montserrat%5BMedium%5D.ttf',
  'Montserrat-SemiBold.ttf': 'https://github.com/google/fonts/raw/main/ofl/montserrat/Montserrat%5BSemiBold%5D.ttf',
};

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    console.log(`📥 Downloading ${path.basename(destPath)}...`);
    
    const file = fs.createWriteStream(destPath);
    
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        return https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`✅ Downloaded ${path.basename(destPath)}`);
            resolve();
          });
        }).on('error', (err) => {
          fs.unlinkSync(destPath);
          reject(err);
        });
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded ${path.basename(destPath)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

async function main() {
  console.log('🎨 RIZE Font Installer\n');
  
  // Create fonts directory if it doesn't exist
  if (!fs.existsSync(FONTS_DIR)) {
    fs.mkdirSync(FONTS_DIR, { recursive: true });
    console.log(`📁 Created directory: ${FONTS_DIR}\n`);
  }

  // Check which fonts already exist
  const existingFonts = [];
  const missingFonts = [];

  for (const [filename, url] of Object.entries(FONT_URLS)) {
    const filePath = path.join(FONTS_DIR, filename);
    if (fs.existsSync(filePath)) {
      existingFonts.push(filename);
    } else {
      missingFonts.push({ filename, url, filePath });
    }
  }

  if (existingFonts.length > 0) {
    console.log('ℹ️  Already installed:');
    existingFonts.forEach(f => console.log(`   ✓ ${f}`));
    console.log('');
  }

  if (missingFonts.length === 0) {
    console.log('✅ All fonts are already installed!\n');
    console.log('📁 Font directory:', FONTS_DIR);
    console.log('\n💡 Next steps:');
    console.log('   1. Uncomment font loading code in app/_layout.tsx');
    console.log('   2. Run: npm start');
    return;
  }

  console.log(`📦 Downloading ${missingFonts.length} missing font(s)...\n`);

  // Download missing fonts
  for (const { filename, url, filePath } of missingFonts) {
    try {
      await downloadFile(url, filePath);
    } catch (error) {
      console.error(`❌ Failed to download ${filename}:`, error.message);
      console.log(`   Manual download: ${url}`);
    }
  }

  console.log('\n✅ Font installation complete!\n');
  console.log('📁 Font directory:', FONTS_DIR);
  console.log('\n📋 Installed fonts:');
  const allFonts = fs.readdirSync(FONTS_DIR).filter(f => f.endsWith('.ttf'));
  allFonts.forEach(f => console.log(`   ✓ ${f}`));

  console.log('\n💡 Next steps:');
  console.log('   1. Uncomment font loading code in app/_layout.tsx');
  console.log('   2. Remove the temporary "fontsLoaded = true" line');
  console.log('   3. Run: npm start');
  console.log('\nSee FONTS_SETUP.md for detailed instructions.');
}

main().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
