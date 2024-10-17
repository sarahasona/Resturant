import { useState, useEffect ,useContext,useRef } from "react";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { LoginContext } from "../context/Login/Login";
import Search from "./Search";

function MainNavBar() {
  const location = useLocation();
  const navigate = useNavigate(); 

  const isActive = (path) => location.pathname === path;
  const { admin } = useContext(LoginContext);
  const [dis, setDis] = useState(false);
  const [dis1, setDis1] = useState(false);
  const [showS, setShowS] = useState(false);
  const { userID } = useContext(LoginContext);
  const { setUSer } = useContext(LoginContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const accountMenuRef = useRef(null); // Create a ref for the account menu

  // Toggle account menu visibility
  const toggleAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu);
  };

  // Handle logout action
  const handleLogout = () => {
    setIsLoggedIn(false); // Update state to logged out
    setShowAccountMenu(false); // Close the account menu
    navigate("/"); // Redirect to home or login page
  };

  // Function to check if user is logged in by checking for a token
  const checkLoginStatus = () => {
    const token = localStorage.getItem("token"); // Assume token is stored in localStorage
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  // Hook to check login status on component mount
  useEffect(() => {
    checkLoginStatus();
    
  }, [isLoggedIn]);

  const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    useEffect(() => {
      const handleResize = () => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  };

  let width = useWindowDimensions();

  function disNave() {
    if (width.width < 768) {
      if (dis) {
        setDis1(false);
        setDis(false);
      } else {
        setDis(true);
      }
    }
  }

  useEffect(() => {
    if (width.width > 768) {
      setDis1(false);
      setDis(false);
    } else {
      setDis1(true);
    }
  }, [width, dis]);

  useEffect(() => {
    setDis(false);
    setShowS(false);
  }, [location]);

  function showSF() {
    setShowS(!showS);
  }

  function handleLogeOut() {
    localStorage.clear();
    setUSer('')
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-blue-50 flex justify-between gap-[10px] py-[20px] px-[40px] items-center h-24">
        <img  src={`${import.meta.env.BASE_URL}da logo.png`} className="w-32" />
        <ul className={"hidden md:flex flex justify-between gap-[30px]"}>
          <li>
            <Link to="/" className={isActive("/") ? "text-primary-hover" : "hover:animate-colorTravel"}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={isActive("/about") ? "text-primary-hover" : ""}>
              About
            </Link>
          </li>
          <li>
            <Link to="/menu" className={isActive("/menu") ? "text-primary-hover" : ""}>
              Menu
            </Link>
          </li>
         
        {
          admin && 
          (
            <li>
            <Link to="dash" className={isActive("/services") ? "text-primary-hover" : ""}>
              Dash Bord
            </Link>
          </li>
          )
        }

          <li>
            <Link to="/offers" className={isActive("/offers") ? "text-primary-hover" : ""}>
              Offers
            </Link>
          </li>
        </ul>

        <div className="flex gap-[20px] justify-self-end ">
          <button onClick={showSF}>
            <i className="fa-solid fa-magnifying-glass hover:text-primary-hover"></i>
          </button>
          <button>
            <i className="fa-solid fa-wallet hover:text-primary-hover"></i>
          </button>
          <button onClick={handleLogeOut}>
            <i className="fa-solid fa-right-to-bracket"></i>
          </button>
          {
            !userID &&

            (
              <Link to="/login">
              <button
                className="flex items-center gap-2 rounded-full px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 transition duration-200 ease-in-out"
              >
                <FaUser className="text-sm" /> Login
              </button></Link>
            )
          }

          {/* Conditional rendering based on login state */}
          {isLoggedIn ? (
            <div className="relative" ref={accountMenuRef}> {/* Attach ref to the menu container */}
              <button
                className="flex items-center gap-2 rounded-full px-4 py-2 text-orange-500  hover:orange-200 transition duration-200 ease-in-out"
                onClick={toggleAccountMenu}
              >
                <FaUser className="text-sm" /> My Account
              </button>

              {/* Account menu dropdown */}
              {showAccountMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link to="/account/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Account Info
                  </Link>
                  <Link to="/account/saved-addresses" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Saved Addresses
                  </Link>
                  <Link to="/account/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button
                className="flex items-center gap-2 rounded-full px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 transition duration-200 ease-in-out"
              >
                <FaUser className="text-sm" /> Login
              </button>
            </Link>
          )}
         
        </div>

        <button onClick={disNave}>
          <i className="fa-solid fa-bars md:hidden"></i>
        </button>
      </nav>

      {showS && !dis && <Search />}

      {dis1 && (
        <div className="relative">
          {dis && (
            <div className="absolute bg-black z-50 w-screen h-screen -top-[100px] bg-opacity-50 flex justify-end">
              <div className="bg-white w-1/2">
                <ul className={"flex gap-[50px] flex-col items-center p-10 h-screen align-middle"}>
                  <button onClick={disNave} className="self-end">
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  {/* <button onClick={showSF}>
                    <i className="fa-solid fa-magnifying-glass hover:text-primary-hover"></i>
                  </button> */}
                  {showS && dis && <Search />}
                  <li>
                    <Link to="/" className={isActive("/") ? "text-primary-hover" : ""}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className={isActive("/about") ? "" : ""}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/menu" className={isActive("/menu") ? "text-primary-hover" : ""}>
                      Menu
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className={isActive("/services") ? "text-primary-hover" : ""}>
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/offers" className={isActive("/offers") ? "text-primary-hover" : ""}>
                      Offers
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default MainNavBar;
