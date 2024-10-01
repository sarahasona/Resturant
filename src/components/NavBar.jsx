import { Link, useLocation } from "react-router-dom";

function MainNavBar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-50 flex justify-between gap-[10px] py-[20px] px-[40px]">
      <h3 className="h3">Resturant</h3>
      <ul className="flex justify-between gap-[30px]">
        <li>
          <Link to="/" className={isActive("/") ? "text-primary-hover" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={isActive("/about") ? "text-primary-hover" : ""}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavBar;
