import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { LoginContext } from "../../context/Login/Login";
import AboutView from './../AboutView';
function ChangeItems({ setShowCay,catchng ,item,setCatC,setSrefresh,refresh,setCatchng }) {
  const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [publicId, setPublicId] = useState("");
    const [_id, setId] = useState(item._id);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(1);
    const [categoryId, setCategoryId] = useState("");
    const [customId, setCustomId] = useState("");
    const [available, setAvailable] = useState("");
    const [orderedTimes, setOrderedTimes] = useState("");
    const [averageRating, setAverageRating] = useState("");
    const [ingredients, setIngredients] = useState("");
    const { token } = useContext(LoginContext);
    const [preview, setPreview] = useState(null);
    
    function handle() {
        setShowCay(true)
        setCatchng([])
      }
useEffect(()=>{
    console.log(_id);
    
    if (JSON.stringify(item).length >3 && item) {
        setPrice(item.price)
        setAvailable(item.available)
        setOrderedTimes(item.orderedTimes)
        setCategoryId(item.categoryId)
        setAverageRating(item.averageRating)
        setIngredients(item.ingredients)
        setImageUrl(item.image.secure_url)        
        setName(item.name)

    }
},[])
const handleImageChange = (e) => {
    



    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //   setImageUrl(reader.result);
  //   console.log(imageUrl);
    
  //   };
  //   reader.readAsDataURL(file);
  // };

 async function update(e) {
    e.preventDefault()
    setAvailable(available ==="true" ?(true):(false))
    
    const formData = new FormData();
    formData.append('image', imageUrl);
    formData.append('name', name);
    // formData.append('price', price);
    // formData.append('available', available);
    // formData.append("ingredients",ingredients)
    console.log();
    
    
    console.log(formData.values("imageUrl"));
    
    
    
    if (item.length==0) {
      try {
        
        console.log(imageUrl)
        console.log(123);
        
        const response = await axios.post(
          `https://restaurant-website-dusky-one.vercel.app/menu?category=6719260373fdcec35732e0d8`,
          
            formData,
            price,
            available,
            name,
            ingredients
            
          
            ,
          {
            headers: {
              

              token: `resApp ${token}`,
              
            },
          }
        );
        console.log(response.data);
  


      } catch (error) {

        console.error('Error uploading the image', error);
      }
      
    }else{
      try {
        

        const response = await axios.patch(
          `https://restaurant-website-dusky-one.vercel.app/menu/${_id}`,
          
          formData,
          price,
          available,
          name,
          ingredients
          
            ,
          {
            headers: {
                "Content-Type": "multipart/form-data",

              token: `resApp ${token}`,
              
            },
          }
        );
        console.log(response.data);
  


      } catch (error) {

        console.error('Error uploading the image', error);
      }
    }
}


  return (
    <div>
       
        <form className="border border-orange-300 shadow-lg rounded-lg p-4 mb-4"
        onSubmit={update}
        >
        <img src={imageUrl } alt="" />
      <h2 className="text-lg font-semibold text-orange-600">item Details</h2>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="border border-gray-300 shadow-md rounded-md p-4">
          <label className="block text-sm font-medium text-gray-700">item name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="border border-gray-300 shadow-md rounded-md p-4">
          <label className="block text-sm font-medium text-gray-700">item PRice</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="border border-gray-300 shadow-md rounded-md p-4">
          <label className="block text-sm font-medium text-gray-700">avilabel?</label>
          <input
            type="text"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div className="border border-gray-300 shadow-md rounded-md p-4">
          <label className="block text-sm font-medium text-gray-700">orderd items</label>
          <input
            type="text"
            value={orderedTimes}
   
            className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div className="border border-gray-300 shadow-md rounded-md p-4">
          <label className="block text-sm font-medium text-gray-700">avreag ratings</label>
          <input
            type="text"
            value={averageRating}

            className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div className="border border-gray-300 shadow-md rounded-md p-4">
          <label className="block text-sm font-medium text-gray-700">ingraduiants</label>
          <input
            type="text"
            value={ingredients.length >0 ? (ingredients.join()):("no ingradtaints")}
            onChange={(e) => setIngredients(e.target.value.split(" "))}
            className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div className="border border-gray-300 shadow-md rounded-md p-4">
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="file"
   
            onChange={handleImageChange}
            className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>


    <button 
        type='submit'

        className="btn bg-orange-500 text-white w-[50%] mx-auto py-2 rounded flex items-center justify-center mt-5">
        update
      </button>

    
      <p className="mt-4 text-center text-sm text-gray-500">Order updated successfully!</p>
    </form>
      <button 
        type='button'
        onClick={handle} 
        className="btn bg-orange-500 text-white w-[50%] mx-auto py-2 rounded flex items-center justify-center mt-5">
        Cancel
      </button>
      
     
    </div>
  )
}

ChangeItems.propTypes = {

}

export default ChangeItems

