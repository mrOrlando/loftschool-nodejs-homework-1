const fs = require('fs');
const path = require('path');

function finder (base, level = 0, groupsOfFiles = {}) {
  const files = fs.readdirSync(base);

  files.forEach(item => {
    const localBase = path.join(base, item);
    const state = fs.statSync(localBase);
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
