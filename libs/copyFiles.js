const fs = require('mz/fs');
const path = require('path');
const finder = require('./finder');

function copyFiles (input, output) {
  return new Promise(async (resolve, reject) => {
    try {
      const allFiles = await finder(input);
      for (let letter in allFiles) {
        if (!isValid(letter)) {
          console.log('skip files which starts from', letter);
          continue;
        }
        const dest = path.join(output, letter);
        await fs.mkdir(dest);
        for (let i = 0; i < allFiles[letter].length; i++) {
          const file = allFiles[letter][i];
          const filename = path.join(dest, file.name);
          await fs.copyFile(file.path, filename);
        }
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

function isValid (letter) {
  letter = letter.toUpperCase();
  return (
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(letter) ||
    'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.includes(letter)
  );
}

module.exports = copyFiles;
