import React, { useState, useContext, useEffect  } from 'react';

import { BrowserRouter } from 'react-router-dom';

import axios from 'axios';
import { LoginContext } from "../../context/Login/Login";
import { useNavigate  } from 'react-router-dom';


function AddCtgory({ setShowCay ,catC,setCatC }) {
  const navigate = useNavigate ();
  const { token,setPublicId,publicId ,catchng, setCatchng,refresh,setSrefresh, setShowItems} = useContext(LoginContext);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [name, setName] = useState('');




function handle() {
      setShowCay(true)
      setCatC(false)
      setPreview(null)
      setImage(null)
      setName("")
      setCatchng([])
      setPublicId([])

}

function cahngeToitems() {
  setPublicId(catchng)
  navigate("/dash/Manue")
}




async  function fetchData() {
      
  try {
    const response = await axios.get(
      `https://restaurant-website-dusky-one.vercel.app/menu/category/${catchng._id}`,

      {
        headers: {
          token: `resApp ${token}`,
          
        },
      }
    );
    console.log(response);
    
    return  response.data.Menuitems;

    
    


  } catch (error) {

    set
    console.error('Error uploading the image', error);
  return []
  }


    }
useEffect(()=>{
  
  setPublicId([])
  
  if(JSON.stringify(catchng).length >3){

  setPreview(catchng.image.secure_url)
  setImage(catchng.image.secure_url)
  setName(catchng.name)
 setShowItems(true)
    
  }else{
  setShowItems(false)
  setPreview(null)
  setImage(null)
  setName("")
  }
},[])



async function delet() {

  
  try {
    const response = await axios.delete(
      `https://restaurant-website-dusky-one.vercel.app/category/${catchng._id}`,

      {
        headers: {
          token: `resApp ${token}`,
          
        },
      }
    );
    console.log(response.data);
    setUploadStatus('Image uploaded successfully!');
    setShowCay(true); 
    setSrefresh(!refresh)
  } catch (error) {
    setUploadStatus('Failed to upload image.');
    console.error('Error uploading the image', error);
  }
}

// ///////////////////////////////////////////////////////////////////////



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(typeof(image)==="string");
    
    if(!(typeof(image)==="string"))formData.append('image', image);
    formData.append('name', name);
    console.log({name , image});
    

    
    if (JSON.stringify(catchng).length <3){

      try {
        const response = await axios.post(
          `https://restaurant-website-dusky-one.vercel.app/category/`,
          formData,
          {
            headers: {
              token: `resApp ${token}`,
              
            },
          }
        );
        console.log(response.data);
        setUploadStatus('Image uploaded successfully!');
        setShowCay(true); 
        setSrefresh(!refresh)

      } catch (error) {
        setUploadStatus('Failed to upload image.');
        console.error('Error uploading the image', error);
      }
    }else{

      try {
        const response = await axios.patch(
          `https://restaurant-website-dusky-one.vercel.app/category/${catchng._id}`,
          formData,
          {
            headers: {
              token: `resApp ${token}`,
              
            },
          }
        );
        console.log(response.data);
        setUploadStatus('Image uploaded successfully!');
        setShowCay(true); 
        setSrefresh(!refresh)

      } catch (error) {

        setUploadStatus('Failed to upload image.');
        console.error('Error uploading the image', error);
      }
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)} 
          required
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
        
        />
        <button type="submit" className="btn bg-orange-500 text-white w[50%] py-2 rounded flex items-center justify-center mt-5">
          Upload
        </button>
      </form>

      {preview && (
        <div>
          <h3>Image Preview:</h3>
          <img src={preview} alt="Preview" style={{ width: '200px', height: 'auto' }} />
        </div>
      )}

      {uploadStatus && <p>{uploadStatus}</p>}

      <button 
        type='button'
        onClick={handle} 
        className="btn bg-orange-500 text-white w-[50%] mx-auto py-2 rounded flex items-center justify-center mt-5">
        Cancel
      </button>
       <button 
        type='button'
        // onClick={delet} 
        className="btn bg-orange-500 text-white w-[50%] mx-auto py-2 rounded flex items-center justify-center mt-5">
        Delete
      </button> 
      <button 
        type='button'
        onClick={cahngeToitems}
        className="btn bg-orange-500 text-white w-[50%] mx-auto py-2 rounded flex items-center justify-center mt-5">
        show the items
      </button> 

    </div>
  );
}

export default AddCtgory;
