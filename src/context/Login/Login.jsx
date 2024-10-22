import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const LoginContext = createContext();

function LoginProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userOpject, setUserOpject] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [category, setCategories] = useState([]);

  const userID = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [userCart, setUserCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUserOpject(userData);

    if (userID && token) {
      setIsLoggedIn(true);
      setAdmin(userData?.role === "Admin");
    }
  }, [userID, token]);

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "https://restaurant-website-dusky-one.vercel.app/category"
      );
      if (response.status === 200) {
        setCategories(response.data?.categories || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const login = (name) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserName("");
    setUserOpject(null);
    setAdmin(false);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setCartCount(0);
  };

  const isAdmin = () => {
    setAdmin(false);
  };
  const getUserCart = async () => {
    try {
      const response = await axios.get(
        "https://restaurant-website-dusky-one.vercel.app/cart",
        {
          headers: {
            token: `resApp ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const cartData = response.data.cart.cart;
   
        if (cartData.length > 0) {
          setUserCart(cartData);
          setCartCount(cartData.length);
          calculateTotalCartPrice();
          return;
        }

        // const userData = data.filter((item) => item.userId == userID);
        // getCartCount();
        // return userData ? setUserCart(userData) : setUserCart([]);
      }
      return setUserCart([]);
    } catch (error) {
      console.error(error);
    }
  };
  const calculateTotalCartPrice = () => {
    let total = 0;
    userCart.forEach((item) => {
      total += item.totalPrice;
    });
    setTotalPrice(total);
  };
  const getCartCount = () => {
    if (userCart.length) {
      return setCartCount(userCart.length);
    }
    return setCartCount(0);
  };
  const removeMealFromCart = async (mealId) => {
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
  // increae or decress meal in cart
  const addToCart = async (mealId, quantity) => {
    console.log(mealId);
    console.log(quantity);
    try {
      const response = await axios.post(
        "https://restaurant-website-dusky-one.vercel.app/cart/update",
        { itemId: mealId, count: quantity },
        {
          headers: {
            token: `resApp ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        const cartData = response.data.cart.cart;
        console.log(response.data.cart.cart);
        setCartCount(cartData.length);
        setUserCart(cartData);
        // setItemExist(true);
      } else {
        throw new Error(
          "error occured when adding item to cart  pleaze try again"
        );
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  const removeAllCartMeals = async () => {
    try {
      const response = await axios.delete(
        "https://restaurant-website-dusky-one.vercel.app/cart/clear",
        {
          headers: {
            token: `resApp ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setCartCount(0);
        setUserCart([]);
      } else {
        throw new Error(
          "error occured when removing all cart items pleaze try again"
        );
      }
    } catch (error) {
      console.error("Error removing all cart items:", error);
    }
  };
  return (
    <LoginContext.Provider
      value={{
        userID,
        userName,
        login,
        logout,
        admin,
        token,
        isLoggedIn,
        getAllCategories,
        category,
        userOpject,
        setUserOpject,
        setAdmin,
        getUserCart,
        userCart,
        cartCount,
        getCartCount,
        setUserCart,
        setCartCount,
        removeMealFromCart,
        totalPrice,
        setTotalPrice,
        addToCart,
        removeAllCartMeals,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
