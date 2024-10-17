import { createContext, useState ,useEffect } from "react";
export const LoginContext = createContext();
function LoginProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [user, setUSer] = useState(false);
  const [token,setToken]=useState('')

  const userID = localStorage.getItem('userId');

  useEffect(()=>{
    if(userID){
      setAdmin(true);
      setToken(localStorage.getItem("token"))
    }else{
      setAdmin(false);
    }
  },[userID,userName ])

  const login = (name) => {
    setUserName(name);
  };
  const logout = () => {
    setUserName("");
  };
  const  isAdmin = () => {
    setAdmin(false)
  }

  return (
    <LoginContext.Provider value={{userID, userName, login, logout ,admin,setAdmin,user,setUSer,token,setToken}}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
