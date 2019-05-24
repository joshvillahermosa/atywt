import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import { SubComponentA } from "./SubComponentA";
import { SubComponentB } from "./SubComponentB";

interface SliderClassProps {
  range: string;
  steps: number;
  updateRange: (value: string) => void;
}

@observer
export class SliderClass extends Component<SliderClassProps> {
  @observable range: string = this.props.range;

  @action
  handleChange = (value: string) => {
    this.range = value;
    this.props.updateRange(value);
  };

  render() {
    const { updateRange } = this.props;
    return (
      <div className={"wat-man"}>
        <>
          <SubComponentA numberA={1} stringA={"engage-the-warp"} />
          <SubComponentB
            numberA={2}
            stringA={"dreaming-is-what-keeps-me-alive"}
            updateRange={updateRange}
          />
        </>
        )}
      </div>
    );
  }
}
