import React from 'react'
import axios from 'axios'
import { useContext,useState,useEffect } from 'react'
import { LoginContext } from "../../context/Login/Login"; 



function ManageItem() {
  const { token } = useContext(LoginContext);

  const getMenu = async () => {
    

    try {
      const response = await axios.get(
        `https://restaurant-website-dusky-one.vercel.app/category`,
        {
          headers: {
            token: `resApp ${token}`,
          },
        }
        
      );
      
    } catch (error) {
      
    }
  };
  getMenu()
  return (
    <div>
      
    </div>
  )
}

export default ManageItem
