import React, { useEffect } from "react";

const ShowItem = ({ category, setShowCay, setCatchng }) => {
  function jandle() {
    setShowCay(false);

    setCatchng(category);
  }
  return (
    <div className="flex justify-between flex-col self-center text-center w-[100%] h-[90%] relative group">
    <h2>{category.name}</h2>
    <p>{category.description}</p>
    <img src={category.image.secure_url} alt="" className="h-[70%]" />
  
    <div className="absolute bottom-4 left-[35%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-100 group-hover:scale-105">
      <button
        className="btn bg-orange-500 text-white mx-auto py-2 rounded-lg flex items-center justify-center mt-s transition-transform duration-300"
        onClick={jandle}
      >
        Show
      </button>
    </div>
  </div>
  
  
  );
};

export default ShowItem;
