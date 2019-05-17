// ...wtf did I build? But it works
const lineByLine = require("n-readlines");

// REGEXES
// TODO: Move out to own file
// FIXME: Currently does not support global
const exportList = /export const ([a-zA-Z]+) */;
const exportDefault = /export default class ([a-zA-Z]+) */;

// React Specific
const onClick = /onClick={/;
const onChange = /onChange={/;

// TODO: Move out to own file
// Index is to override if the the regex has one or more capture groups
const findProp = ({ line, regex, index = 1 }) => {
  if (!regex.test(line)) return;

  const value = regex.exec(line);
  return value[index] ? value[index] : value[0];
};

// TODO: Refactor me :/ I just cowboy coded this out
const loadFileReaderDependencies = ({ lineReader }) => {
  // File Reader
  return file => {
    const liner = new lineReader(file);
    // Default Properties
    let fileProperties = {
      exportDefault: undefined,
      exportList: [],
      events: {
        onChange: false,
        onClick: false
      },
      fileLocation: file,
      barrel: true
    };

    // TODO: Refactor to own method chared with file reader
    while ((rawLine = liner.next())) {
      const line = rawLine.toString("ascii");

      // TODO: This can be put into some loop or reducer
      const exportSingleProp = findProp({
        line,
        regex: exportList
      });

      const exportDefaultProp = findProp({
        line,
        regex: exportDefault
      });

      const onChangeProp = findProp({
        line,
        regex: onChange
      });

      const onClickProp = findProp({
        line,
        regex: onClick
      });

      if (exportDefaultProp) fileProperties.exportDefault = exportDefaultProp;
      if (exportSingleProp) fileProperties.exportList.push(exportSingleProp);
      if (onClickProp) fileProperties.events.onClick = true;
      if (onChangeProp) fileProperties.events.onChange = true;
    }

    return fileProperties;
  };
};

const fileReader = loadFileReaderDependencies({
  lineReader: lineByLine
});

module.exports = { fileReader, findProp };
