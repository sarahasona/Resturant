import Payment from "../components/Payment";

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
        <Payment amount={50} />
      </div>
    </div>
  );
}

export default Checkout;
