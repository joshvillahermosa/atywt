const mri = require("mri");
const { fileReader } = require("./file-reader");
const getFilesToBeTested = require("./read-directory");
const argv = process.argv.slice(2);
const args = mri(argv);
const { fileName, directoryName } = args;

// if (!fileName) return console.error("No file name passed in, will not run");
// const fileProperties = fileReader(fileName);
// console.table(fileProperties);

if (!directoryName)
  return console.error("No file name passed in, will not run");
const files = getFilesToBeTested({ directoryName });
console.log(files);

files.forEach(file => {
  const fileProperties = fileReader(file);
  console.table(fileProperties);
});
