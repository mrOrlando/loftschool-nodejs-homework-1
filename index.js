const fs = require('mz/fs');
const argv = require('yargs')
  .usage('Usage: $0 inputDirectory outputDirectory [options]')
  .example(
    '$0 inputDirectory outputDirectory',
    'creates the new folder with a name <outputDirectory> and copies there the sorted files from the <inputDirectory> folder.'
  )
  .help('help')
  .alias('help', 'h')
  .options({
    delete: {
      alias: 'D',
      command: 'delete',
      description: 'deletes the source directory'
    }
  }).argv;

const copyFiles = require('./libs/copyFiles');
const deleteDir = require('./libs/deleteDir');

const [input, output] = argv._;

(async () => {
  const isExist = await fs.exists(input);
  if (!isExist) {
    console.error(`There is no such directory: "${input}"`);
    console.info('Enter --help command and look at the arguments.');
    return false;
  }

  if (!output) {
    console.error(`Output directory not set!`);
    console.info('Enter --help command and look at the arguments.');
    return false;
  }

  try {
    // deletes the new folder if it's already created
    await deleteDir(output);
    // creates the new folder
    await fs.mkdir(output);
    // copies the sorted files there
    await copyFiles(input, output);
    // deletes the source directory if necessary
    deleteInputDir();
  } catch (e) {
    console.error('error', e);
  }
})();

async function deleteInputDir () {
  const isDelete = 'delete' in argv && argv.delete === true;
  if (isDelete) {
    await deleteDir(input);
  }
}
