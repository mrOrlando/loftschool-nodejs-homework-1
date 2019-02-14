const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

const copyFiles = require('./src/copyFiles');
const deleteDir = require('./src/deleteDir');

const [input, output] = argv._;

if (!fs.existsSync(input)) {
  console.error(`There is no such directory: "${input}"`);
  return false;
}

if (!output) {
  console.error(`Output directory not set!`);
  return false;
}

// deletes the new folder if it's already created
deleteDir(output, () => {
  // creates the new folder
  fs.mkdirSync(output);
  // copies the sorted files there
  copyFiles(input, output);
  // deletes the source directory if necessary
  deleteInputDir();
});

function deleteInputDir() {
  const isDelete = 'delete' in argv && argv.delete === true;
  if (isDelete) {
    deleteDir(input);
  }
}
