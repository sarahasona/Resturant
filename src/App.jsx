import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/HomeView";
import About from "./pages/AboutView";
import Layout from "./pages/Layout";
import LoginProvider from "./context/Login/Login";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import AccountView from "./pages/AccountView"
import SavedAddresses from "./pages/SavedAddresses";
import Orders from "./pages/Orders";

function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="account" element={<AccountView />}>
              <Route path="profile" element={<Profile />} />
              <Route path="saved-addresses" element={<SavedAddresses />} />
              <Route path="orders" element={<Orders />} />
          </Route>

          


          </Route>
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
