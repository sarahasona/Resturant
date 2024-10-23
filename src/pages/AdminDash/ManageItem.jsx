import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { LoginContext } from "../../context/Login/Login";
import CatgoryCard from './CatgoryCard';
import AddCtgory from './AddCtgory';

function ManageItem() {
  const [addCt, setAddCat] = useState(true);  
  const { token } = useContext(LoginContext);
  const [categories, setCategories] = useState([]);
  const [catchng, setCatchng] = useState([]);
  const [catC, setCatC] = useState(false);

  console.log(catC);
  


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
      }
    });
  }, []);
  
 
  return (
    <>
      {
        addCt ? (
          <div className="container grid grid-cols-2 justify-between items-center gap-[30px] w-[80%] h-fit m-auto relative">
            {
              categories.length > 0 ? (
                categories.map((category, index) => (
                  <CatgoryCard
                    key={index}
                    category={category}
                    setShowCay={setAddCat}
                    setCatchng={setCatchng}
                  />
                ))
              ) : <p>Loading</p>
            }
            <div className='flex justify-center flex-col self-center text-center w-[100%] h-[90%] relative' onClick={() => setAddCat(false)}>
              <h2>
                <i className="fa-solid fa-plus text-[200px] self-center"></i>
              </h2>
            </div>
          </div>
        ) : (
          <AddCtgory setShowCay={setAddCat}
          catC={catC}
          catchng={catchng}
          setCatC={setCatC}
          /> 
        )
      }
    </>
  );
}

export default ManageItem;
