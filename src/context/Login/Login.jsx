import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const LoginContext = createContext();

function LoginProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userOpject,setUserOpject]=useState(JSON.parse(localStorage.getItem("user")))
  const userID = localStorage.getItem("userId");
  const token = localStorage.getItem("token"); 



  useEffect(()=>{
    setUserOpject(JSON.parse(localStorage.getItem("user")))
  },[])

  useEffect(() => {
    if (userID && token) {
      setAdmin(true);
      setIsLoggedIn(true);
    } else {
      setAdmin(false);
      setIsLoggedIn(false);
      logout();
    }
  }, [userID, userName, token]);

  const [category, setCategories] = useState([]);
  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "https://restaurant-website-dusky-one.vercel.app/category"
      );
      if (response.status == 200) {
        response.data?.categories
          ? setCategories(response.data.categories)
          : setCategories([]);
      }
      // console.log(await response.data.categories);
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
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  const isAdmin = () => {
    setAdmin(false);
  };

  return (
    <LoginContext.Provider
      value={{
        userID,
        userName,
        login,
        logout,
        admin,
        setAdmin,
        user,
        setUser,
        token,
        isLoggedIn,
        getAllCategories,
        category,
        setUserOpject,
        userOpject,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
