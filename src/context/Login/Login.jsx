import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const LoginContext = createContext();

function LoginProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);
<<<<<<< HEAD
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userOpject,setUserOpject]=useState(JSON.parse(localStorage.getItem("user")))
  const userID = localStorage.getItem("userId");
  const token = localStorage.getItem("token"); 
console.log(userOpject);


  useEffect(()=>{
    setUserOpject(JSON.parse(localStorage.getItem("user")))
  },[])
=======
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userID = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
>>>>>>> 7dd6d2134a3619424fd9e21d511d11a1a17c3a85

  useEffect(() => {
    if (userID && token) {
      setAdmin(true);
      setIsLoggedIn(true);
    } else {
      setAdmin(false);
      setIsLoggedIn(false);
      logout();
    }
<<<<<<< HEAD
  }, [userID, userName, token]); 
=======
  }, [userID, userName, token]);
>>>>>>> 7dd6d2134a3619424fd9e21d511d11a1a17c3a85

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
<<<<<<< HEAD
    setIsLoggedIn(true); 
=======
    setIsLoggedIn(true);
>>>>>>> 7dd6d2134a3619424fd9e21d511d11a1a17c3a85
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
<<<<<<< HEAD
    <LoginContext.Provider value={{setUserOpject,userOpject, userID, userName, login, logout, admin, setAdmin, user, setUser, token, isLoggedIn }}>
=======
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
      }}
    >
>>>>>>> 7dd6d2134a3619424fd9e21d511d11a1a17c3a85
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
