import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const LoginContext = createContext();

function LoginProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userOpject, setUserOpject] = useState(JSON.parse(localStorage.getItem("user")));
  const [category, setCategories] = useState([]);

  const userID = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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
  };

  return (
    <LoginContext.Provider
      value={{
        userID,
        userName,
        login,
        logout,
        admin,
        isLoggedIn,
        getAllCategories,
        category,
        userOpject,
        setUserOpject,
        setAdmin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
