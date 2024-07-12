import React from 'react'
import { useSelector } from 'react-redux'


export default function CardNewsPage({ singleNew }) {
    const darkmode = useSelector((state)=>state.theme.value)

    return (
        <div className={`flex flex-col justify-center items-center gap-10  ${darkmode?'dark':''}`}>
            <h2 className='text-center text-2xl lg:text-3xl font-semibold dark:text-white dark:customTransiption'>{singleNew.title}</h2>
            <div className='flex justify-center items-center flex-col lg:flex-row '>
                <figure className='m-0 min-w-[300px] lg:w-[300px] h-[300px] p-5 lg:p-0 lg:pl-5'>
                    <img src={singleNew.image} alt={`article's img ${singleNew.title} `} className='w-full h-full rounded-lg shadow-xl object-cover' />
                </figure>
                <div className='w-full px-5'>
                    <div className='flex items-center md:items-end justify-between flex-col lg:flex-row mb-2'>
                        <p className='text-md dark:text-gray-400 dark:customTransiption'>Release date: {singleNew.date}</p>
                        <p className='text-3xl dark:text-white dark:customTransiption'>{singleNew.author}</p>
                    </div>
                    <div>
                        <div dangerouslySetInnerHTML={{__html: singleNew.content}} className='dark:text-white'/>
                        <a href={singleNew.link} className='text-blue-600 flex items-end'>
                            Read more
                            <svg xmlns="http://www.w3.org/2000/svg" href={singleNew.link} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
