import React, { Component } from "react";
import { action } from "mobx";
import { observer } from "mobx-react";

interface ComponentBProps {
  textA: string;
  textB?: string;
  booleanA?: boolean;
  onChange: (value: string) => void;
}

@observer
export class ComponentB extends Component<ComponentBProps> {
  booleanA: boolean = this.props.booleanA;
  componentDidMount() {
    console.log(this.props);
  }

  @action
  handleChange = ({
    currentTarget: { value }
  }: React.SyntheticEvent<HTMLInputElement>) => {
    if (!value) this.booleanA = true;
    else this.booleanA = false;

    this.props.onChange(value);
  };

  render() {
    const { textA, textB } = this.props;
    const className = "classA";

    return (
      <div className={className}>
        <input value={textA} onChange={this.handleChange} placeholder={textB} />
      </div>
    );
  }
}
