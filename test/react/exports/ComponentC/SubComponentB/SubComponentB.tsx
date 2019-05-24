import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";

interface SubComponentBProps {
  numberA: number;
  stringA: string;
  updateRange: (value: any) => void;
}

@observer
export class SubComponentB extends React.Component<SubComponentBProps> {
  color = "#000";
  bgColor = "#FFF";

  @action
  updateValue = ({
    currentTarget: { value }
  }: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.updateRange(value);
  };

  subComponentBOne = () => {
    const range = parseFloat(this.props.stringA);
    const { numberA } = this.props;
    const classA = "awesome-sauce";
    const styleA = {
      background: `linear-gradient(to right, ${this.color} ${(range / numberA) *
        100}%, ${this.bgColor} ${(range / numberA) * 100}%)`
    };
    return (
      <input
        type="range"
        className={classA}
        style={styleA}
        value={range}
        min="0"
        max={numberA}
        step={0.1}
        onChange={this.updateValue}
      />
    );
  };

  subComponentBTwo = () => {
    const { numberA, stringA } = this.props;
    return (
      <input
        type="range"
        className={"the-greatest-class-man"}
        value={stringA}
        min="0"
        max={numberA}
        step={1}
        onChange={this.updateValue}
      />
    );
  };

  render() {
    return (
      <>
        {this.props.numberA === 1
          ? this.subComponentBOne()
          : this.subComponentBTwo()}
      </>
    );
  }
}
