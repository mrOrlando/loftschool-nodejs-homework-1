const del = require('del');

function deleteDir (path, callback) {
  del(path).then(paths => {
    if (paths.length) {
      console.log('Deleted files and folders:\n', paths.join('\n'));
    }
    callback && callback();
  });
}

module.exports = deleteDir;
