import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { LoginContext } from "../../context/Login/Login";

function AddCtgory({ setShowCay,catchng ,catC,setCatC }) {
  const { token } = useContext(LoginContext);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [name, setName] = useState('');

function handle() {
  setShowCay(true)
  setCatC(false)

  
}
useEffect(()=>{
  if(catchng){

    console.log(catC);
  setPreview(catchng.image.secure_url)
  setImage(catchng.image.secure_url)
  setName(catchng.name)

  }
},[])

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
    formData.append('image', image);
    formData.append('name', name);

    try {
      const response = await axios.post(
        "https://restaurant-website-dusky-one.vercel.app/category",
        formData,
        {
          headers: {
            token: `resApp ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data);
      setUploadStatus('Image uploaded successfully!');
      setShowCay(true); 
    } catch (error) {
      setUploadStatus('Failed to upload image.');
      console.error('Error uploading the image', error);
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
          required
        />
        <button type="submit" className="btn bg-orange-500 text-white w-full py-2 rounded flex items-center justify-center mt-5">
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
    </div>
  );
}

export default AddCtgory;
