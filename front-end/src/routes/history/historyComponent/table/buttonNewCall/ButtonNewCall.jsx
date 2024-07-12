import React from 'react'

export default function ButtonNewCall({ page, setPage, totPage }) {


    const forward = () => {
        if (page < totPage) {
            setPage(++page);
        }
    }

    const back = () => {
        if (page > 1) {
            setPage(--page);
        }
    }

    return (
        <div className='w-full flex justify-between items-center text-white my-5'>
            <button className='from-[#7949EE] to-[#46DEE6] bg-gradient-to-l p-2 rounded' onClick={back}>Back</button>
            <button className='from-[#7949EE] to-[#46DEE6] bg-gradient-to-r p-2 rounded' onClick={forward}>Forward</button>
        </div>
    )
}
