import { createContext, useState } from "react";
import axios from 'axios'
export const LoginContext = createContext();
function LoginProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [user, setUSer] = useState(false);
  const [category,setCategories] = useState([])
  const userToken = localStorage.getItem("token");
  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "https://restaurant-website-dusky-one.vercel.app/category",
        {
          headers: {
            token: `resApp ${userToken}`,
          },
        }
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
  };
  const logout = () => {
    setUserName("");
  };
  const  isAdmin = () => {
    setAdmin(false)
  }

  return (
    <LoginContext.Provider value={{ userName, login, logout ,admin,setAdmin,getAllCategories,category}}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
