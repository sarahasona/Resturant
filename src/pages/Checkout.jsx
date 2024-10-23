import Payment from "../components/Payment";
//! change the id to the actual order id

import { useState, useContext, useEffect } from "react";
import { LoginContext } from "../context/Login/Login";
import Spinner from "../components/Spinner";
const Checkout = () => {
  const { getUserCart, userCart, totalPrice, calculateTotalCartPrice, token } =
    useContext(LoginContext);
  const [loading, setLoading] = useState(false);


  const orderDetails = {
    items: userCart,
    totalAmount: () => {
      let total = 0;
      userCart.forEach((item) => (total += item.totalPrice));
      console.log(total);
      return total;
    }, // Total Price of the Cart Items
    currency: "EGP", // Can be dynamic
  };


  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        await getUserCart();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching cart data", error);
      }
    };

    fetchCart();
  }, []);

  // calculate total price
  useEffect(() => {
    calculateTotalCartPrice();
  }, [userCart]);
  return (
    <div className="checkout-container mx-auto px-4 py-8 w-[50%]">
      <h1 className="text-3xl font-semibold mb-8 text-center">Checkout</h1>

      {/* Order Summary */}
      <div className="order-summary p-4 mb-6 bg-gray-100 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {loading ? (
          <Spinner />
        ) : (
          <div className="orderData">
            <ul className="order-items-list mb-4">
              {orderDetails.items.map((item) => (
                <li
                  key={item.menuItem._id}
                  className="flex justify-between mb-2"
                >
                  <span>{item.menuItem.name}</span>
                  <span>LE {item.menuItem.price}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>LE {totalPrice}</span>
            </div>
          </div>
        )}
      </div>

      {/* PayPal Section */}
      <div>
        <Payment orderId={"6715b037b25d4c494414ce4c"} />
      </div>
    </div>
  );
};

export default Checkout;
