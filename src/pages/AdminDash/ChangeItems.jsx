import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { LoginContext } from "../../context/Login/Login";

function ChangeItems({ setShowCay, catchng, item, setCatC, setSrefresh, refresh, setCatchng }) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [publicId, setPublicId] = useState("");
  const [_id, setId] = useState(item._id);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [available, setAvailable] = useState("");
  const [orderedTimes, setOrderedTimes] = useState("");
  const [averageRating, setAverageRating] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const { token } = useContext(LoginContext);
  const [preview, setPreview] = useState(null);

  function handle() {
    setShowCay(true);
    setCatchng([]);
  }

  useEffect(() => {
    if (JSON.stringify(item).length > 3 && item) {
      setPrice(item.price);
      setAvailable(item.available);
      setOrderedTimes(item.orderedTimes);
      setCategoryId(item.categoryId);
      setAverageRating(item.averageRating);
      setIngredients(item.ingredients || []); // Ensure ingredients is an array
      setImageUrl(item.image.secure_url);
      setName(item.name);
    }
  }, [item]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleIngredientsChange = (e) => {
    const inputValue = e.target.value;
    const ingredientsArray = inputValue.split(",").map((ingredient) => ingredient.trim()); // Split by commas and trim whitespace
    setIngredients(ingredientsArray);
    console.log(ingredients);
    
  };

  async function update(e) {
    e.preventDefault();
    setAvailable(available === "true" ? true : false);
  
    const formData = new FormData();
    // formData.append('image', image);  // Appending the actual image file, not base64
    formData.append('name', name);
    formData.append('price', price);
    formData.append('available', available);
 
    console.log(ingredients);
    
    try {
      const response = Object.keys(item).length === 0
        ? await axios.post(
            `https://restaurant-website-dusky-one.vercel.app/menu?category=6719260373fdcec35732e0d8`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                token: `resApp ${token}`,
              },
            }
          )
        : await axios.patch(
            `https://restaurant-website-dusky-one.vercel.app/menu/${_id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                token: `resApp ${token}`,
              },
            }
          );
  
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading the image', error.response?.data || error);
    }
  }
  
  return (
    <div>
      <form
        className="border border-orange-300 shadow-lg rounded-lg p-4 mb-4"
        onSubmit={update}
      >
        <img src={imageUrl} alt="" />
        <h2 className="text-lg font-semibold text-orange-600">Item Details</h2>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="border border-gray-300 shadow-md rounded-md p-4">
            <label className="block text-sm font-medium text-gray-700">Item Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="border border-gray-300 shadow-md rounded-md p-4">
            <label className="block text-sm font-medium text-gray-700">Item Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="border border-gray-300 shadow-md rounded-md p-4">
            <label className="block text-sm font-medium text-gray-700">Available?</label>
            <input
              type="text"
              value={available}
              onChange={(e) => setAvailable(e.target.value)}
              className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <div className="border border-gray-300 shadow-md rounded-md p-4">
            <label className="block text-sm font-medium text-gray-700">Ordered Times</label>
            <input
              type="text"
              value={orderedTimes}
              className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <div className="border border-gray-300 shadow-md rounded-md p-4">
            <label className="block text-sm font-medium text-gray-700">Average Ratings</label>
            <input
              type="text"
              value={averageRating}
              className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <div className="border border-gray-300 shadow-md rounded-md p-4">
            <label className="block text-sm font-medium text-gray-700">Ingredients (comma separated)</label>
            <input
              type="text"
              value={ingredients.join(", ")} // Display ingredients as comma-separated string
              onChange={handleIngredientsChange}
              className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <div className="border border-gray-300 shadow-md rounded-md p-4">
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-orange-500 text-white w-[50%] mx-auto py-2 rounded flex items-center justify-center mt-5"
        >
          Update
        </button>
      </form>

      <button
        type="button"
        onClick={handle}
        className="btn bg-orange-500 text-white w-[50%] mx-auto py-2 rounded flex items-center justify-center mt-5"
      >
        Cancel
      </button>
    </div>
  );
}

export default ChangeItems;
