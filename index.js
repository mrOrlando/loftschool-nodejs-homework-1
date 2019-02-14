const fs = require('fs');
const path = require('path');
const del = require('del');
var argv = require('minimist')(process.argv.slice(2));

const [input, output] = argv._;
const allFiles = {};

if (!fs.existsSync(input)) {
  console.error(`There is no such directory: "${input}"`);
  return false;
}

if (!output) {
  console.error(`Output directory not set!`);
  return false;
}

const readDir = (base, level) => {
  const files = fs.readdirSync(base);

  files.forEach(item => {
    let localBase = path.join(base, item);
    let state = fs.statSync(localBase);
    if (state.isDirectory()) {
      readDir(localBase, level + 1);
    } else {
      const firstLetter = item.charAt().toUpperCase();
      if (firstLetter in allFiles) {
        allFiles[firstLetter].push({ path: localBase, name: item });
      } else {
        allFiles[firstLetter] = [{ path: localBase, name: item }];
      }
    }
  });
};

readDir(input, 0);

del(output).then(paths => {
  if (paths.length) {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  }
  fs.mkdirSync(output);

  for (let letter in allFiles) {
    const dest = path.join(output, letter);
    fs.mkdir(dest, () => {
      allFiles[letter].map(file => {
        const filename = path.join(dest, file.name);
        fs.copyFile(file.path, filename, () => {});
      });
    });
  }

  const isDeleteInputDir = 'delete' in argv && argv.delete === true;
  if (isDeleteInputDir) {
    del(input).then(paths => {
      if (paths.length) {
        console.log('Deleted files and folders:\n', paths.join('\n'));
      }
    });
  }
});
