import { useEffect, useState } from "react";
import { FaHeart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../context/Login/Login";
import axios from "axios";

const Cards = ({ item, image, showDetails, category }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [addOrDeleteCartItems, setAddDeleteCartItems] = useState([]);
  const {
    token,
    userID,
    getUserCart,
    userCart,
    getCartCount,
    setCartCount,
    setUserCart,
    removeMealFromCart,
    addToCart,
  } = useContext(LoginContext);
  // const [itemExist, setItemExist] = useState(false);
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  // Add meal to cart
  const handleAddToCart = async (mealId) => {
    addToCart(mealId,1);
  };

  // Remove meal from cart
  const removeFromCart = async (mealId) => {
    try {
      const response = await axios.delete(
        `https://restaurant-website-dusky-one.vercel.app/cart/${mealId}`,
        {
          headers: {
            token: `resApp ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        const cartData = response.data.cart.cart;
        console.log(cartData);
        setCartCount(cartData.length);
        setUserCart(cartData);
      } else {
        throw new Error(
          "error occured when removing item from cart  pleaze try again"
        );
      }
    } catch (error) {
      console.error("Error processing cart:", error);
    }
  };
  // useEffect(() => {
  //   // Check if the item exists in the cart after userCart is loaded/updated
  //   if (userCart.length > 0) {
  //     checkItemExist();
  //   }
  // }, [userCart]); // Re-run check when userCart changes
  return (
    <div className="card shadow-xl relative md:my-5 rounded-xl">
      <div
        className={`rounded-full cursor-pointer z-10 rating gap-1 absolute right-0 top-0 p-4 heartStar bg-primary-hover ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <figure className="flex justify-center items-center">
        <img
          src={image}
          alt={item.name}
          className="hover:scale-105 transition-all duration-300 md:h-72 w-[100%]"
        />
      </figure>
      <div className="card-body px-3 flex flex-col justify-between max-h-full">
        <h2 className="card-title">{item.name}!</h2>
        <p>{item.description}</p>
        <div className="flex justify-start items-center gap-2">
          {!showDetails && item.ingredients && (
            <>
              <span className="text-label">Ingredients: </span>{" "}
              {/* Text before the map */}
              {item.ingredients.map((ele, i) => (
                <span
                  key={i}
                  className="rounded p-2 bg-darkorange text-white mr-1"
                >
                  {ele}
                </span>
              ))}
            </>
          )}
        </div>
        <div className="card-actions">
          <div className="flex justify-between items-center mt-2 mb-4">
            <h5 className="font-semibold">
              <span className="text-sm text-red-500">LE </span> {item.price}
            </h5>
            <div className="flex gap-2 justify-center items-center">
              {showDetails ? (
                <Link
                  to={`/menu/${category}/${item.name}`}
                  state={{ mealId: item._id }}
                >
                  <FaEye className="w-5 h-5 text-primary-hover cursor-pointer hover:text-darkorange" />
                </Link>
              ) : (
                ""
              )}
              {token && (
                <>
                  {userCart.find((ele) => ele.menuItem._id == item._id) ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        removeFromCart(item._id);
                      }}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      className="btn bg-primary-hover text-white"
                      onClick={() => {
                        handleAddToCart(item._id);
                      }}
                    >
                      Add to Cart{" "}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
