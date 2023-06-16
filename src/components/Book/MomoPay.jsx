import Momo from "./momo.jpg"
const MomoPay = (prop) => {
    return(
        <div
        style={{
          minHeight: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={Momo} style={{ width: "40%", height: "40%" }} />
        <div style={{ marginTop: 10 }}>
          <span style={{ display: "block", fontWeight: "bold" }}>
            Total Pay: {prop.sum} đ
          </span>
        </div>
      </div>
    )
}

export default MomoPay