import React from 'react'
import axios from 'axios'
import { useContext,useState,useEffect } from 'react'
import { LoginContext } from "../../context/Login/Login"; 
import CatgoryCard from './CatgoryCard';
import AddCtgory from './AddCtgory';



function ManageItem() {
  const { token } = useContext(LoginContext);
  const [categoriess, setCategories] = useState([]);
  const [addCt,setAddCat]=useState(true)
  const allCato = async () => {
    try {
      const response = await axios.get(
        `https://restaurant-website-dusky-one.vercel.app/category`,
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
      if (data && Array.isArray(data.categories)) {
        setCategories(data.categories); 
        
        
        
      } else {
        
      }
    });
  }, []);

  
  return (
   <>
   {
    addCt ? 
    ( <div  className="container grid grid-cols-2 justify-between items-center gap-[30px]
      w-[80%] h-fit m-auto relative "  >
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
<div className='flex justify-center flex-col self-center text-center w-[100%] h-[90%] relative ' onClick={()=> setAddCat(false)}>

<h2>
<i className="fa-solid fa-plus text-[200px] self-center" ></i>
</h2>

</div>

</div>
):
<AddCtgory 
setAddCat={setAddCat}/>
   }
   </>
  )

}

export default ManageItem
