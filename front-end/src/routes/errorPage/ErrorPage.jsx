import React from 'react'

export default function ErrorPage() {
  return (
    <div className=' absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8'>
        <figure className='m-0 rounded-md'>
            <img src="./img/imgError/errorPage.png" alt="" />
        </figure>
        <div className='flex flex-col justify-center items-start gap-8'>
            <h2 className=' text-6xl font-semibold'>Ooops....</h2>
            <p className='text-xl'>Error <span className='font-semibold'>404</span></p>
            <p className='text-3xl '>Something went wrong, please try again later</p>
        </div>
    </div>
  )
}
