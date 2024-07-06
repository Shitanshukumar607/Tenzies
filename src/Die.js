export default function Die(props) {
  return (
    <div className={"die-face" + (props.isHeld ? " is-held" : "")}>
      <h2>{props.value}</h2>
    </div>
  );
}
