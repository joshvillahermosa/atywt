// TODO: Abstract logic out to it's own template
// TODO: Handle default cases
// TODO: Handle cases if there is more that one export
const reactExportListTemplate = ({
  exportListImport,
  exportClassImport,
  exportClass,
  exportList,
  events
}) => `
import React from "react";
import { render, cleanup } from "react-testing-library";
${exportListImport ? exportListImport : ""}
${exportClassImport ? exportClassImport : ""}

describe("<${exportList[0] || exportClass[0]} />", () => {
  afterEach(cleanup);

  describe('<${exportList[0] || exportClass[0]} /> rendering', () => {
    it("should match HTML Snapshot", () => {
      const { container } = render(<${exportList[0] || exportClass[0]} />);
      expect(container.cloneNode(true)).toMatchSnapshot();
    });
  });
  ${
    events.onChange || events.onClick
      ? `
  describe('<${exportList[0] || exportClass[0]} /> interactions', () => {
    // Add Interaction Tests
  })`
      : ""
  }
});
`;
module.exports = { reactExportListTemplate };
