import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/HomeView";
import About from "./pages/AboutView";
import Layout from "./pages/Layout";
import LoginProvider from "./context/Login/Login";
function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
