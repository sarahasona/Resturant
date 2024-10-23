import Payment from "../components/Payment";
//! change the id to the actual order id
function Checkout() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 600,
      }}
    >
      <div style={{ width: "50%" }}>
        <Payment orderId={"6715b037b25d4c494414ce4c"} />
      </div>
    </div>
  );
}

export default Checkout;
