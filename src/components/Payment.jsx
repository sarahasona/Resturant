import { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../context/Login/Login";
import { toast } from "react-toastify";

//! Change the URL and user token, and perform actions based on success or failure.
//! All payment logic is already working; just handle the UI changes.

const Payment = ({ orderId }) => {
  const navigate = useNavigate();
  const { token, setUserCart, setCartCount, setTotalPrice } =
    useContext(LoginContext);
  const paypalRef = useRef(null);

  useEffect(() => {
    if (paypalRef.current) return;
    // console.log("PayPal button rendered");
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
                  "http://127.0.0.1:5000/pay/intiate",
                  {
                    orderId: orderId,
                  },
                  {
                    headers: {
                      token: `resApp ${token}`,
                    },
                  }
                );

                return response.data.orderId;
              } catch (error) {
                toast.error("Error creating PayPal order:", error);
                // console.error("Error creating PayPal order:", error);
                // alert("Error creating order. Please try again.");
                //! failde to create the order (from our side : backend)
              }
            },
            onApprove: async (data, actions) => {
              try {
                const details = await actions.order.capture();
                await axios.post(
                  "http://127.0.0.1:5000/pay/update",
                  {
                    orderId: orderId,
                    paypalOrderId: details.id,
                    payerInfo: details.payer,
                  },
                  {
                    headers: {
                      token: `resApp ${token}`,
                    },
                  }
                );
                toast.success(
                  "Transaction completed by " + details?.payer?.name?.given_name
                );
                setUserCart([]);
                setCartCount(0);
                setTotalPrice(0);
                navigate(`/account/orders`);

                // alert(
                //   "Transaction completed by " + details.payer.name.given_name
                // );
              } catch (error) {
                toast.error("Error capturing payment:", error);
                // console.log("Payment capture error:", error);
                // alert("Payment failed. Please try again.");
                //! There may be a failure on our backend while verifying the payment,
                //! even if the purchase was successfully completed on the PayPal side.
              }
            },
            onError: (err) => {
              toast.error("PayPal error:", err);
              // console.error("PayPal error:", err);
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

  return <div id="paypal-button-container" className="z-10"></div>;
};

export default Payment;
