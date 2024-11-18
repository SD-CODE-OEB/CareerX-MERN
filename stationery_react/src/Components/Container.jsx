import "../styles.css";
const Container = (props) => {
  const className = "wrapper " + props.className;
  return <div className={className}>{props.children}</div>;
};

export default Container;
