import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <>
      <div className="footer mt-4"> {/* Reduced margin-top */}
        <div className="big-con">
          <div className="firstrow">
            <div className="logo">
              <img
                src={`${import.meta.env.BASE_URL}da logo.png`}
                alt="Restaurant Logo"
                className="h-24 w-24" // Further reduced size
              />
              <p className="description">
                Best restaurant with food beyond words.
              </p>
            </div>

            <div className="listoflinks pt-3">
              <h3>Links</h3> {/* Shortened heading */}
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
              <h3 className="mb-3 mt-12">Contact Us</h3> 
              <div className="links flex gap-3 mb-2"> 
                <a href="#"> <i className="fa-brands fa-facebook icon"></i></a>
                <a href="#"><i className="fa-brands fa-twitter icon"></i></a>
                <a href="#"><i className="fa-brands fa-square-instagram icon"></i></a>
              </div>
              <a href="mailto:s2yam@gmail.com">s2yam@gmail.com</a>
            </div>
          </div>

          <div className="second-row">
            <p>&copy; 2024, Best React Developers</p> {/* Shortened text */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
