import React from 'react'

const CatgoryCard = (category) => {

    
  return (
    <div className='flex justify-between flex-col self-center text-center w-[100%] h-[90%] relative '>
        
        <h2>{category.category.name}</h2>

        <p>{category.category.description}</p>

        <img src={category.category.image.secure_url} alt="" className='h-[70%]' />

        <div>
            
        </div>

    </div>
  )
}

export default CatgoryCard
