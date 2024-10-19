import { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

function LoginProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userOpject,setUserOpject]=useState(JSON.parse(localStorage.getItem("user")))
  const userID = localStorage.getItem("userId");
  const token = localStorage.getItem("token"); 
console.log(userOpject);


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

  const login = (name) => {
    setUserName(name);
    setIsLoggedIn(true); 
  };

  const logout = () => {
    setUserName("");
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false); 
  };

  const isAdmin = () => {
    setAdmin(false);
  };

  return (
    <LoginContext.Provider value={{setUserOpject,userOpject, userID, userName, login, logout, admin, setAdmin, user, setUser, token, isLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
