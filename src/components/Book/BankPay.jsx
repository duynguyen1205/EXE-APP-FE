
import bank from "./bank.jpg";
const BankPay = (props) => {
  return (
    <div
      style={{
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={bank} style={{ width: "40%", height: "40%" }} />
      <div style={{ marginTop: 10 }}>
        <span style={{ display: "block", fontWeight: "bold" }}>
          Total Pay: {props.sum} đ
        </span>
      </div>
    </div>
  );
};

export default BankPay;
