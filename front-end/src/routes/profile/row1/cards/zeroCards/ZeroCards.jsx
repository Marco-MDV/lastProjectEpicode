import React from 'react'
import SpanComponent from '../../../../../components/spanComponent/SpanComponent'
import { useDispatch } from 'react-redux';
import { toggleModal } from "../../../../../redux/setBoleanStateModal";
export default function ZeroCards() {
  const change = useDispatch()
  
  return (
    <div className='bg-slate-300 h-4/6 w-4/6 md:h-4/6 md:w-5/6 flex justify-center items-center shadow-2xl rounded-md my-10 md:my-0'>
      <button className='bg-slate-200 rounded-full  flex justify-center items-center  flex-col p-7 focus:shadow-inner gap-3' onClick={()=>change(toggleModal())}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg>
        <p>
          add <SpanComponent text='card'/>
        </p>
      </button>
    </div>
  )
}
