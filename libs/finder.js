const fs = require('mz/fs');
const path = require('path');

async function finder (base, level = 0, groupsOfFiles = {}) {
  const files = await fs.readdir(base);

  files.forEach(async item => {
    const localBase = path.join(base, item);
    const state = await fs.stat(localBase);
    if (state.isDirectory()) {
      finder(localBase, level + 1, groupsOfFiles);
    } else {
      const firstLetter = item.charAt().toUpperCase();
      if (firstLetter in groupsOfFiles) {
        groupsOfFiles[firstLetter].push({ path: localBase, name: item });
      } else {
        groupsOfFiles[firstLetter] = [{ path: localBase, name: item }];
      }
    }
  });

  return groupsOfFiles;
}

module.exports = finder;
