import React, { useEffect, useRef } from "react";

const Payment = ({ amount }) => {
  const paypalRef = useRef(null);

  useEffect(() => {
    if (paypalRef.current) return;
    console.log("rendered");
    paypalRef.current = true;

    const loadPayPalButton = () => {
      if (window.paypal) {
        window.paypal
          .Buttons({
            style: {
              size: "responsive",
              shape: "rect",
              label: "checkout",
            },
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: { value: amount },
                  },
                ],
                application_context: {
                  shipping_preference: "NO_SHIPPING",
                },
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then((details) => {
                alert(
                  "Transaction completed by " + details.payer.name.given_name
                );
              });
            },
          })
          .render("#paypal-button-container");
      }
    };

    loadPayPalButton();

    return () => {
      if (window.paypal) {
        window.paypal.Buttons().close();
      }
    };
  }, [amount]);

  return <div id="paypal-button-container"></div>;
};

export default Payment;
