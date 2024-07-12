import React from 'react'

export default function LabelCustom({text, getInfo, type}) {
    return (
        <label className='flex flex-col gap-2'>
            <p className='dark:text-white dark:customTransiption'>
                {text}:
            </p>
            <input type={text} name={text} typeof={type} placeholder={text} className=' border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={getInfo}/>
        </label>
    )
}
