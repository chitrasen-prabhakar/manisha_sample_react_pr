const Switch = (props) => {
  const { test, children } = props;
  return children.find((child) => {
    return child.props.value === test;
  });
};

export default Switch;
