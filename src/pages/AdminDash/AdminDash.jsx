import React from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
import { LoginContext } from "../../context/Login/Login";
import { useContext } from "react";



function AdminDash() {
  // const { admin } = useContext(LoginContext);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div  className=" flex  justify-between relative">

      <div className="sidM w-1/4 h-[90vh] flex  flex-col gap-[20px] bg- p-4 border-r-2 border-gray-300">

        <div className='flex justify-center items-center gap-[10px]'>

        <i className="fa-solid fa-table-columns"></i>
          <p>
            Dash Board

          </p>
         
        </div>
        <ul  className="flex flex-col gap-[20px]">

          <li>
          <i className="fa-solid fa-user mr-3"></i>
            <Link
              to="user"
              className={isActive("/dash/user") ? "text-primary-hover" : ""}
            >
              Users
            </Link>
          </li>

          <li>
            <Link
              to="Manue"
              className={isActive("/dash/Manue") ? "text-primary-hover" : ""}
            >
              Manue
            </Link>
          </li>

          <li>
            <Link
              to="orders"
              className={isActive("/dash/orders") ? "text-primary-hover" : ""}
            >
              orders
            </Link>
          </li>

          <li>
            <Link
              to="item"
              className={isActive("/dash/item") ? "text-primary-hover" : ""}
            >
              mange itmes
            </Link>
          </li>
        </ul>
        
      </div>
      
        <div className='w-3/4'>
            <Outlet />
        </div>
    </div>
  );
}

export default AdminDash;