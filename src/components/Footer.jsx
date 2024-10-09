import { Link, useLocation } from "react-router-dom";


function Footer() {
  return (
    <div className=" h-[40vh] w-full bg-slate-50 flex flex-col ">
      <div className="row  flex-wrap  md: row-start-1 col-span-3 flex justify-between  p-[20px]">
        <div className="flex flex-col h-fit w-1/4">
          <img src="da logo.png" className=" h-56 w-56" />
          <p>the best resturant in the world with food byond word and warld</p>
        </div>
        <div>  
          <h3 className=" pb-6 ">important links</h3>        
          <ul  className="  flex flex-col gap-4 "> 


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
        <div>
          <h3>contant useEffect</h3>
          <ul>
            
            <li>gamil@gamil.com</li>
            <li> social medai</li>
          </ul>
        </div>
       
      </div>
      <div className="fine-rwo row-start-2 col-span-3 flex justify-between border-t border-t-[1px] items-center">
        <p>
          copyrihgt fose to the best react devolbers in the world
        </p>
        <div className="links p-5">
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-twitter"></i>
        <i className="fa-brands fa-discord icon "></i>
        </div>
      </div>
    </div>
  )
}

export default Footer