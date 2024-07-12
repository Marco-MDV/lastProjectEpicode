import React from 'react'

export default function LoaderCard() {
  return (
    <div className='w-[300px] h-[120px] animate-pulse flex flex-col justify-between items-start border border-2 rounded-md p-2'>
        <div className='h-2 bg-gray-200 rounded-full w-2/3'></div>
        <div className='h-2 bg-gray-200 rounded-full w-1/3'></div>
        <div className='h-2 bg-gray-200 rounded-full w-1/2'></div>
    </div>
  )
}
