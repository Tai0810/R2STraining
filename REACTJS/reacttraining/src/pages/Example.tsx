import React from "react";

type Props = {
  name: { value: string; id: number };
};

class Example extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  shouldComponentUpdate(
    nextProps: Readonly<Props>,
    nextState: Readonly<{}>,
    nextContext: any
  ): boolean {
    const { name: currentName } = this.props;
    const { name: nextName } = nextProps;
    return currentName.value !== nextName.value;
  }
  render() {
    console.log("Example@@@");
    return (
      <>
        <h2>hello {this.props.name.value}</h2>
      </>
    );
  }
}

export default Example;
