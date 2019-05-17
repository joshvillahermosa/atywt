import React from "react";
import { render, cleanup } from "react-testing-library";

import { Level } from ".";

describe("<Level />", () => {
  const childElement = <div>Child</div>;
  const { container } = render(<Level>{childElement}</Level>);

  afterEach(cleanup);

  it("should return HTML Snapshot", () => {
    expect(container.cloneNode(true)).toMatchSnapshot();
  });
});
