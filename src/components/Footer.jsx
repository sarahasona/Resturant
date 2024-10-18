import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <>
      <div className="footer mt-10">
        <div className="big-con">
          <div className="firstrow">
            <div className="logo">
              <img
                src={`${import.meta.env.BASE_URL}da logo.png`}
                alt="Restaurant Logo"
                className="h-56 w-56"
              />
              <p className="description">
                The best restaurant in the world with food beyond word and world.
              </p>
            </div>

            <div className="listoflinks">
              <h3>Important Links</h3>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="about">About</Link>
                </li>
                <li>
                  <Link to="/menu">Menu</Link>
                </li>
                <li>
                  <Link to="/">Services</Link>
                </li>
                <li>
                  <Link to="/">Offers</Link>
                </li>
              </ul>
            </div>

            <div className="contact">
              <h3>Contact Us</h3>
              <ul>
                <li>Email: s2yam@gmail.com</li>
                <li>Social Media: [Links]</li>
              </ul>
            </div>
          </div>

          <div className="second-row">
            <p>&copy; 2024, The Best React Developers in the World</p>
            <div className="links">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-discord icon"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
