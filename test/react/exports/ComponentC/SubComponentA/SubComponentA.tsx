import React from "react";

interface SubComponentAProps {
  numberA: number;
  stringA: string;
}

export class SubComponentA extends React.Component<SubComponentAProps> {
  color = "#000";
  bgColor = "#FFF";

  render() {
    const range = parseInt(this.props.stringA, 10);
    const { numberA } = this.props;
    return (
      <span
        className={"className"}
        style={{
          width: "100%",
          background: `${this.bgColor} ${(range / numberA) * 100}%, ${
            this.bgColor
          } ${(range / numberA) * 100}%)`
        }}
      />
    );
  }
}
