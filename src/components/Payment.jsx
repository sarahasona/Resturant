import React, { useEffect, useRef } from "react";
import axios from "axios";

//! Change the URL and user token, and perform actions based on success or failure.
//! All payment logic is already working; just handle the UI changes.

const Payment = ({ orderId }) => {
  const paypalRef = useRef(null);

  useEffect(() => {
    if (paypalRef.current) return;
    console.log("PayPal button rendered");
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
            createOrder: async (data, actions) => {
              try {
                const response = await axios.post(
                  "http://192.168.1.9:5000/pay/intiate",
                  {
                    orderId: orderId,
                  },
                  {
                    headers: {
                      token:
                        "resApp eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzBlZjkyYzgzZTk5NTE5MTliODY5YjgiLCJzZXNzaW9uSWQiOiI1Yzk0M2JmNC1mMjkwLTQ3Y2ItOTAyYy1mZWNmMGFiYTdiOTYiLCJpYXQiOjE3MjkwMzQ1NDAsImV4cCI6MTczMDI0NDE0MH0.AHRvNTRJzB4_4zlh1Mmf9wK7c1kKWSMl7HbAGVq9mjs",
                    },
                  }
                );
                return response.data.orderId;
              } catch (error) {
                console.error("Error creating PayPal order:", error);
                // alert("Error creating order. Please try again.");
                //! failde to create the order (from our side : backend)
              }
            },
            onApprove: async (data, actions) => {
              try {
                const details = await actions.order.capture();
                console.log("Transaction completed:", details);

                await axios.post(
                  "http://192.168.1.9:5000/pay/update",
                  {
                    orderId: orderId,
                    paypalOrderId: details.id,
                    payerInfo: details.payer,
                  },
                  {
                    headers: {
                      token:
                        "resApp eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzBlZjkyYzgzZTk5NTE5MTliODY5YjgiLCJzZXNzaW9uSWQiOiI1Yzk0M2JmNC1mMjkwLTQ3Y2ItOTAyYy1mZWNmMGFiYTdiOTYiLCJpYXQiOjE3MjkwMzQ1NDAsImV4cCI6MTczMDI0NDE0MH0.AHRvNTRJzB4_4zlh1Mmf9wK7c1kKWSMl7HbAGVq9mjs",
                    },
                  }
                );

                // alert(
                //   "Transaction completed by " + details.payer.name.given_name
                // );
              } catch (error) {
                console.log("Payment capture error:", error);
                // alert("Payment failed. Please try again.");
                //! There may be a failure on our backend while verifying the payment,
                //! even if the purchase was successfully completed on the PayPal side.
              }
            },
            onError: (err) => {
              console.error("PayPal error:", err);
              // alert("Payment process encountered an error.");
              //! its paypal fault not us!
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
  }, [orderId]);

  return <div id="paypal-button-container"></div>;
};

export default Payment;
