const fs = require('fs');
const path = require('path');
const finder = require('./finder');

function copyFiles (input, output) {
  const allFiles = finder(input);
  for (let letter in allFiles) {
    const dest = path.join(output, letter);
    fs.mkdir(dest, () => {
      allFiles[letter].map(file => {
        const filename = path.join(dest, file.name);
        fs.copyFile(file.path, filename, () => {});
      });
    });
  }
}

module.exports = copyFiles;
