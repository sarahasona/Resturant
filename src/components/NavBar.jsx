import { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function MainNavBar() {
  const isActive = (path) => location.pathname === path;
  const location = useLocation();
  const[dis,setDis]= useState(false)
  const[dis1,setDis1]= useState(false)


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
  let width  = useWindowDimensions();



function disNave() {
  if (width.width < 768) {
    if (dis) {
    
      
      setDis(false)
    }else{
      setDis(true)
    }
  }
  
}

useEffect(() => {
  if (width.width > 768) {
    setDis1(false)
    console.log(dis);
    
  }else(
    setDis1(true)
  )

},[width])
const locationN = useLocation();
useEffect(()=>{
  setDis(false)
},[locationN])


  return (
  <>
    <nav className="bg-blue-50 flex justify-between gap-[10px] py-[20px] px-[40px] items-center h-24">
      <img src="da logo.png" className=" w-32" />
        <UlList show={true}/>

      <div  className="flex gap-[20px] justify-self-end hidden md:flex">

       <button className="btn-icon" > <i className="fa-solid fa-magnifying-glass hover:text-icon-hover "></i></button>
       <button  className="btn-icon"> <i className="fa-solid fa-wallet  hover:text-icon-hover"></i></button>
        <button   className="btn-accent rounded-3xl h-12 w-20">
          contact
        </button>
      </div>
      <button onClick={disNave}>
      <i className="fa-solid fa-bars md:hidden "></i>
  </button>
    </nav>
    
    {
      dis1 &&
      (
        <div className="relative">
        
        {
          dis &&
          (
            <div className="absolute bg-black z-10 w-screen h-screen -top-[100px] bg-opacity-50 flex justify-end">
             <div className=" bg-white w-1/2 ">
          <ul className={"flex gap-[50px] flex-col items-center p-10 h-screen align-middle "}>
              <button onClick={disNave} className="self-end"><i className="fa-solid fa-xmark "></i></button>
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
              <li>
                <Link
                  to="/about"
                  className={isActive("/menu") ? "text-primary-hover" : ""}
                >
                  menu
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={isActive("/services") ? "text-primary-hover" : ""}
                >
                  services
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={isActive("/offers") ? "text-primary-hover" : ""}
                >
                  offers
                </Link>
              </li>
        
      </ul>
        </div>
            </div>
          )
        }


    </div>
      )
    }

  </>

  );
}


function UlList(show) {
  const isActive = (path) => location.pathname === path;
  return(
        <>
        <ul className={show.show ? "flex justify-between gap-[30px]  hidden md:flex":"flex justify-between gap-[30px]  "}>
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
        <li>
          <Link
            to="/about"
            className={isActive("/menu") ? "text-primary-hover" : ""}
          >
            menu
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={isActive("/services") ? "text-primary-hover" : ""}
          >
            services
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={isActive("/offers") ? "text-primary-hover" : ""}
          >
            offers
          </Link>
        </li>
        
      </ul>
        
        </>
  )
}
export default MainNavBar;
