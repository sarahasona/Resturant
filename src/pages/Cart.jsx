import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/Login/Login";
import PaginatedTable from "../components/CartTable";
import { useNavigate} from "react-router-dom";
import { GrFormNextLink } from "react-icons/gr";
function Cart() {
  const { userCart, token, userID, getUserCart, removeAllCartMeals } =
    useContext(LoginContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleRemoveCart = () => {
    removeAllCartMeals();
  };
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout");
  };
  useEffect(() => {
    getUserCart(); // Fetch user cart on mounting component.
  }, []);
  useEffect(() => {
    let price = 0;
    userCart.forEach((item) => (price += item.totalPrice));
    setTotalPrice(price);
  }, [userCart]);
  return (
    <div className="cart-container mt-[20px] w-[90%] mx-auto min-h-[70vh]">
      <div className="flex justify-between items-center mb-[20px]">
        <h2 className="h2 text-primary-hover px-5"> Cart</h2>
        {userCart.length > 0 && (
          <button className="btn bg-red-500" onClick={handleRemoveCart}>
            Clear All
          </button>
        )}
      </div>

      {userCart.length > 0 ? (
        <div className="">
          <PaginatedTable data={userCart} rowsPerPage={5} />
          <p className="mt-[50px]">
            Total Price{" "}
            <span className="bg-primary-hover text-white p-1 rounded">
              {totalPrice} LE
            </span>{" "}
            <div className="flex justify-end mt-4 mb-7"> 
            <button className="btn bg-orange-500 rounded-md flex items-center" onClick={handleCheckout}>
              Checkout <GrFormNextLink />
            </button>
          </div>
          </p>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <img src="/empty_cart.png" className="w-[400px]" />
        </div>
      )}
    </div>
  );
}

export default Cart;
