import { Link, useLocation } from "react-router-dom";
import "./footer.css"

function Footer() {
  return (
   <>
   <div className="footer">
   <div className=" big-con ">
      <div className="firstrow  ">


        <div className="logo " >
          <img src="da logo.png" className=" h-56 w-56 " />
          <p>the best resturant in the world with food byond word and warld</p>
        </div>



        <div className=" listoflinks" >  
          <h3 className=" ">important links</h3>        
          <ul  className=" "> 


            <li>
              <Link to="/">
              home
              </Link>
            </li>
            <li>
              <Link to="about">
              about
              </Link>
            </li>
            <li>
              <Link to="/">
              menu
              </Link>
            </li>
            <li>
              <Link to="/">
              servces
              </Link>
            </li>
            <li>
              <Link to="/">
              offers
              </Link>
            </li>
          </ul></div>



        <div className=" conatct">
          <h3>contant useEffect</h3>
          <ul>
            
            <li>gamil@gamil.com</li>
            <li> social medai</li>
          </ul>
        </div>
       
      </div>



      <div className="scond-row">
        <p>
          copyrihgt fose to the best react devolbers in the world
        </p>

        <div className="links  ">
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-twitter"></i>
        <i className="fa-brands fa-discord icon "></i>
        </div>

      </div>


    </div>



   </div>
   
   
   </>
  )
}

export default Footer