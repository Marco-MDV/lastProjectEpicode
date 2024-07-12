import React from 'react'

export default function LoaderTableActions({classCustom}) {
  return (
    <div className={`${classCustom} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-custom-gradient-history w-full h-full`}>
      <div className='from-[#7949EE] to-[#46DEE6] bg-gradient-to-r p-2 rounded shadow-xl relative '>
        <p className='text-white text-xl'>
          Loading...
        </p>
        <div className='w-[20px] h-[20px] rounded-full bg-white absolute top-[-10px] right-[-10px] shadow-inner-custom animate-ping'></div>
      </div>
    </div>
  )
}
