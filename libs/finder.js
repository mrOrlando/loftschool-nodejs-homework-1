const fs = require('mz/fs');
const path = require('path');

async function finder (base, level = 0, groupsOfFiles = {}) {
  try {
    const files = await fs.readdir(base);

    for (let i = 0; i < files.length; i++) {
      const item = files[i];
      const localBase = path.join(base, item);
      const state = await fs.stat(localBase);

      if (state.isDirectory()) {
        await finder(localBase, level + 1, groupsOfFiles);
      } else {
        groupsOfFiles = handleItem(groupsOfFiles, item, localBase);
      }
    }

    return groupsOfFiles;
  } catch (e) {
    console.error('error', e);
  }
}

function handleItem (groupsOfFiles, item, localBase) {
  const firstLetter = item.charAt().toUpperCase();
  if (firstLetter in groupsOfFiles) {
    const count = getCount(groupsOfFiles[firstLetter], item);
    groupsOfFiles[firstLetter].push({
      path: localBase,
      name: count ? `${item}-copy-${count}` : item,
      originalName: item
    });
  } else {
    groupsOfFiles[firstLetter] = [
      { path: localBase, name: item, originalName: item }
    ];
  }

  return groupsOfFiles;
}

function getCount (list, name) {
  return list.reduce((count, file) => {
    if (file.originalName === name) {
      return ++count;
    }
    return count;
  }, 0);
}

module.exports = finder;
