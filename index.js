const mri = require("mri");
const { fileReader } = require("./file-reader");
const getFilesToBeTested = require("./read-directory");
const writeTemplateFile = require("./file-writer");
const argv = process.argv.slice(2);
const args = mri(argv);
const { directoryName, debug } = args;

// TODO: Read from config or args
const config = { debug };

if (!directoryName)
  return console.error("No file name passed in, will not run");
const files = getFilesToBeTested({ directoryName, debug });
console.log("Writing tes files for: ", files);

files.forEach(file => {
  const fileProperties = fileReader(file);
  writeTemplateFile(fileProperties, config);
});
