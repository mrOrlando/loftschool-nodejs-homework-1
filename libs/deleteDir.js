const del = require('del');

function deleteDir (path) {
  return new Promise((resolve, reject) => {
    del(path)
      .then(paths => {
        if (paths.length) {
          console.log('Deleted files and folders:\n', paths.join('\n'));
        }
        resolve();
      })
      .catch(e => {
        reject(e);
      });
  });
}

module.exports = deleteDir;
