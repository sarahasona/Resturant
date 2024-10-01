import { createContext, useState } from "react";
export const LoginContext = createContext();
function LoginProvider({ children }) {
  const [userName, setUserName] = useState("");
  const login = (name) => {
    setUserName(name);
  };
  const logout = () => {
    setUserName("");
  };
  return (
    <LoginContext.Provider value={{ userName, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
