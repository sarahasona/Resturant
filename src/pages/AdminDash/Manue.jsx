import React from 'react'
import axios from 'axios'
import { useContext,useState,useEffect } from 'react'
import { LoginContext } from "../../context/Login/Login"; 
import CatgoryCard from './CatgoryCard';

function Manue() {

  const { token } = useContext(LoginContext);
  const [categoriess, setCategories] = useState([]);


  const allCato = async () => {
    try {
      const response = await axios.get(
        `https://restaurant-website-dusky-one.vercel.app/menu
`,
        {
          headers: {
            token: `resApp ${token}` 
          },
        }
      );
      return response.data; 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    allCato().then((data) => {
      if (data && Array.isArray(data.allMenu)) {
        setCategories(data.allMenu); 
        
        
        
      } else {
        
      }
    });
  }, []);

  
  return (
    <div  className="container grid grid-cols-2 justify-between items-center gap-[30px]
                      w-[80%] h-fit m-auto "  >

      {
        categoriess.length > 0 ?(
          categoriess.map((category, index) => (
            <CatgoryCard
             key={index} 
             category={category}
             
             />
          ))
        ):<p>Looding</p>
      }
      
    </div>
  )
}

export default Manue
