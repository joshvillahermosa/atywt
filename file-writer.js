// TODO: Move out to it's own util
const fs = require("fs");
const { reactExportListTemplate } = require("./template");

const createTemplateProperties = ({ fileProperties }) => {
  let templateProperties = Object.assign({}, fileProperties);
  const {
    fileLocation,
    exportList,
    exportDefault,
    exportClass
  } = fileProperties;

  templateProperties.filePath = fileLocation
    .split("/")
    .reduce((acc, item, index) => {
      if (index !== fileLocation.split("/").length - 1) return `${acc}${item}/`;
      return acc;
    }, "");

  // TODO: Handle non barreled cases. This current takes the last item of the array
  if (exportList.length >= 1) {
    templateProperties.exportList = fileProperties.exportList.reverse();
    templateProperties.exportListImport = `import { ${fileProperties.exportList.join(
      ", "
    )} } from './'`;
  }

  if (exportClass.length >= 1) {
    templateProperties.exportClass = fileProperties.exportClass.reverse();
    templateProperties.exportClassImport = `import { ${fileProperties.exportClass.join(
      ", "
    )} } from './'`;
  }

  if (exportDefault)
    templateProperties.exportDefaultImport = `import ${exportDefault} from './'`;

  return templateProperties;
};

const writeTemplateFile = (fileProperties, config) => {
  const templateProperties = createTemplateProperties({ fileProperties });
  const testFileName = `${fileProperties.exportList[0] ||
    fileProperties.exportClass[0]}.test.tsx`;
  const testFileNameWithPath = `${templateProperties.filePath}${testFileName}`;
  const template = reactExportListTemplate(templateProperties);

  if (config.debug) {
    console.log("OUTPUT");
    console.log("File Properties");
    console.table(fileProperties);
    console.log("Template Properties");
    console.table(templateProperties);
    console.log("Template to Write");
    console.log(template);
  }

  // TODO: Handle default export cases
  if (fs.existsSync(testFileNameWithPath))
    return console.info(
      `${
        templateProperties.filePath
      }${testFileName} exists already, will not write`
    );

  fs.writeFile(testFileNameWithPath, template, error => {
    if (error) return console.error(`Cannot write ${testFileName}`, error);
    console.log(`Done Writing Tests File for ${testFileNameWithPath}`);
  });
};

module.exports = writeTemplateFile;
