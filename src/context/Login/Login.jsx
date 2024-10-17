import { createContext, useState } from "react";
export const LoginContext = createContext();
function LoginProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [user, setUSer] = useState(false);
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
    <LoginContext.Provider value={{ userName, login, logout ,admin,setAdmin}}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
