const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/ff4j-features/runtime-es2015.js',
    './dist/ff4j-features/polyfills-es2015.js',
    './dist/ff4j-features/main-es2015.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'elements/ff4j-features.js');
}());
