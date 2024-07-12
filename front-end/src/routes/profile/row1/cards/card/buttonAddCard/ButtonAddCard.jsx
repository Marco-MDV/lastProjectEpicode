import React from 'react'
import SpanComponent from '../../../../../../components/spanComponent/SpanComponent'
import { useDispatch } from 'react-redux'
import { toggleModal } from '../../../../../../redux/setBoleanStateModal'

export default function ButtonAddCard() {
    const change = useDispatch()
    const handleClick = () => {
        change(toggleModal())
    }
    return (
        <button className='group-hover:opacity-100 opacity-0 duration-500 absolute top-[-15px] left-[50%] transform -translate-x-1/2 bg-white text-black p-2 rounded shadow-2xl flex gap-5' onClick={handleClick}>
            <SpanComponent text='Add Card' />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#7949EE', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#46DEE6', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <path strokeLinecap="round" strokeLinejoin="round" stroke="url(#gradient1)" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>
        </button>
    )
}
