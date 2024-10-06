import { Link, useLocation } from "react-router-dom";


function Footer() {
  return (
    <div className="container w-2/3 bg-slate-50 ">
      <div className="row">
        <div>
          <ul>
            <li>
              <Link to="/">
              home
              </Link>
            </li>
            <li>
              <Link to="/">
              home
              </Link>
            </li>
            <li>
              <Link to="/">
              home
              </Link>
            </li>
            <li>
              <Link to="/">
              home
              </Link>
            </li>
          </ul>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Footer