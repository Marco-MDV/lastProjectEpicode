import React from 'react'
import HistoryComponent from './historyComponent/HistoryComponent'

export default function HistoryPage() {
   
    

    return (
        <main className='grid grid-rows-3 grid-cols-1 gap-20'>
            <div className='w-full h-full flex justify-between items-center flex-col gap-5'>
                <h1 className=' text-[64px] p-2 from-[#7949EE] to-[#46DEE6] bg-gradient-to-r inline-block text-transparent bg-clip-text font-bold text-center'>History</h1>
                <div className='flex gap-5 flex-col w-full justify-center items-center'>
                    <p className='text-xl font-bold'>You can change your future</p>
                    <figure className='m-0 w-full h-[300px] md:p-4 '>
                        <img src="https://res.cloudinary.com/diz0po094/image/upload/v1720706980/finance/mitlsottojzw4fgqbd8o.jpg" alt="img hero"  className='w-full h-full object-cover md:rounded-md shadow-2xl'/>
                    </figure>
                </div>
            </div>
            <HistoryComponent />
        </main>
    )
}
