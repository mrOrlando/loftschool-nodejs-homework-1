const fs = require('fs');
var argv = require('yargs')
  .usage('Usage: $0 inputDirectory outputDirectory [options]')
  .example(
    '$0 inputDirectory outputDirectory',
    'creates the new folder with a name <outputDirectory> and copies there the sorted files from the <inputDirectory> folder.'
  )
  .help('h')
  .alias('h', 'help')
  .options({
    delete: {
      alias: 'D',
      command: 'delete',
      description: 'deletes the source directory'
    }
  }).argv;

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
