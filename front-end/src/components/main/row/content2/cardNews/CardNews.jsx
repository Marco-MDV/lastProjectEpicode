import React from 'react'
import SpanComponent from '../../../../spanComponent/SpanComponent'

export default function CardNews({ title, link, image }) {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      <h2 className='text-3xl font-semibold dark:text-white dark:customTransiption mb-8'> News <SpanComponent text='24h' /></h2>
      <div className='flex flex-col md:flex-row justify-center items-center gap-8 md:px-10'>
        <figure className='m-0 rounded-md w-[300px] h-[150px] px-5 md:px-0'>
          <img src={image} alt={`img ${title}`} className='w-full h-full object-cover rounded-md' />
        </figure>
        <h3 className='text-xl font-semibold dark:text-white dark:customTransiption text-wrap text-start px-5'>
          {title}
          <a href={link} className='text-blue-600 flex items-end'>
            Read more
            <svg xmlns="http://www.w3.org/2000/svg" href={link} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          </a>
        </h3>
      </div>
    </div>
  )
}

