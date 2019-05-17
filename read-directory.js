const fs = require("fs");
const lineByLine = require("n-readlines");

const { findProp } = require("./file-reader");
const fileNameFromIndex = /(import|export) ([a-zA-Z]+|\*) from '\.\/([a-zA-Z]+)'/;

// Const move to File-Reader?
const getFilesToBeTested = ({
  directoryName,
  extension,
  isBarreled,
  ignoreSnapshotsDir = true
}) => {
  // Try converting to const
  let filesToBeTested = [];

  if (directoryName[directoryName.length - 1] !== "/")
    directoryName = `${directoryName}/`;

  const files = fs.readdirSync(directoryName);
  const parsedFiles = files.map(item => {
    return item.split(".");
  });

  // TODO: Abstract out of
  const directoryContainsSubDirectory = parsedFiles.reduce((acc, item) => {
    if (ignoreSnapshotsDir && item[0] === "__snapshots__") return acc;

    if (item.length === 1) return true;
    else return acc;
  }, false);

  const directoryContainsIndex = parsedFiles.reduce((acc, item) => {
    if (item.length === 2 && `${item[0]}.${item[1]}` === "index.ts")
      return true;
    else return acc;
  }, false);

  if (directoryContainsSubDirectory) {
    parsedFiles.forEach(folder => {
      if (ignoreSnapshotsDir && folder === "__snapshots__") return;

      if (folder.length !== 1) return;
      const files = getFilesToBeTested({
        directoryName: `${directoryName}${folder}`
      });
      filesToBeTested = [...filesToBeTested, ...files];
    });
  }

  if (directoryContainsIndex) {
    // TODO: Refactor to own method chared with file reader
    const liner = new lineByLine(`${directoryName}index.ts`);
    while ((rawLine = liner.next())) {
      const line = rawLine.toString("ascii");
      const something = findProp({ regex: fileNameFromIndex, line, index: 3 });
      if (something) filesToBeTested.push(`${directoryName}${something}.tsx`);
    }
  }

  // console.log(
  //   parsedFiles,
  //   `Contains Subdirectory? ${directoryContainsSubDirectory}`,
  //   `Contains index.ts? ${directoryContainsIndex}`,
  //   "Main Files: ",
  //   filesToBeTested
  // );

  return filesToBeTested;
};

module.exports = getFilesToBeTested;
