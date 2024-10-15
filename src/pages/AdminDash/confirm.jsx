import React from 'react'

const Confirm = (setShowC) => {
  return (
    <div className='absolute bg-[rgba(0,0,0,0.41)] w-full h-full flex items-center'>
     <div className='bg-white w-[50%] h-[50%] ml-[15%] flex flex-col gap-[25%] p-12 items-center' >
     <h3>
        DO YOU REALLY WANT TO DELET THIS USER
      </h3>
        <div className=' flex gap-[10%]'>
        <button className='btn btn-primary'>
        yes
      </button>
      <button className='btn btn-primary 'onClick={() => setShowC.setShowC(false)}>
        NO
      </button>
        </div>
     </div>
    </div>
  )
}

export default Confirm
