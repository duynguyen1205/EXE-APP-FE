import { Button } from "antd";
import PacmanLoader from "react-spinners/PacmanLoader";

const Loading = () => {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  return (
    <div style={style}>
      <PacmanLoader color="#36d7b7" />
      <p style={{marginTop: "2px", fontSize: "20px"}}>Loading</p>
      <Button type="primary" style={ {right: "10%"}} onClick={() => { window.location.href = "/" }}>Back Home</Button>
    </div>
  );
};

export default Loading;
