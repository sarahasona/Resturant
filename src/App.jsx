import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/HomeView";
import About from "./pages/AboutView";
import Layout from "./pages/Layout";
import LoginProvider from "./context/Login/Login";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminDash from "./pages/AdminDash/AdminDash";
import Usres from "./pages/AdminDash/Usres";
import Manue from "./pages/AdminDash/Manue";
import ManageItem from "./pages/AdminDash/ManageItem";
import ManageOrders from "./pages/AdminDash/ManageOrders";
import MenuView from "./pages/MenuView";
import MealDetail from "./pages/MealDetail";
function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* Default category route (redirect to a specific category) */}
            <Route path="/menu" element={<Navigate to="/menu/all" />} />
            {/* Route based on category */}
            <Route path="/menu/:category" element={<MenuView />} />
            {/* <Route path="menu" element={<MenuView />} /> */}
            <Route path="menu/:category/:mealName" element={<MealDetail />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="dash" element={<AdminDash />}>
              <Route path="user" element={<Usres />} />
              <Route path="Manue" element={<Manue />} />
              <Route path="orders" element={<ManageOrders />} />
              <Route path="item" element={<ManageItem />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
