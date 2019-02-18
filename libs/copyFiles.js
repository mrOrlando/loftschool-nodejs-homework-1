const fs = require('mz/fs');
const path = require('path');
const finder = require('./finder');

function copyFiles (input, output) {
  return new Promise(async (resolve, reject) => {
    try {
      const allFiles = await finder(input);
      console.log('allFiles', allFiles); // TODO Why allFiles are empty?
      for (let letter in allFiles) {
        const dest = path.join(output, letter);
        await fs.mkdir(dest);
        allFiles[letter].map(async file => {
          const filename = path.join(dest, file.name);
          await fs.copyFile(file.path, filename);
        });
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = copyFiles;
