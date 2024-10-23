import React, { useEffect } from 'react'

const ShowItem = ({category, setShowCay ,setCatchng}) => {

function jandle(){
  setShowCay(false)

  setCatchng(category)
}
  return (
    <div className='flex justify-between flex-col self-center text-center w-[100%] h-[90%] relative '
  
    >
        
        <h2>{category.name}</h2>

        <p>{category.description}</p>

        <img src={category.image.secure_url} alt="" className='h-[70%]' />

        <div className='
        absolute bottom-4 left-[35%]
        '>
            <button className=' btn bg-orange-500 text-white  mx-auto py-2 rounded flex items-center justify-center mt-s' 
              onClick={jandle}
            >
              Show 
            </button>
        </div>

    </div>
  )
}

export default ShowItem