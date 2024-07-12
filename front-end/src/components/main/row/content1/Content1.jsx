import React from 'react'
import Btc from './btc/Btc';
import SpanComponent from '../../../spanComponent/SpanComponent';



export default function Content1() {
  return (
    <>
      <div className='  col-span-2 flex flex-wrap justify-center items-center dark:bg-slate-700 dark:text-white dark:customTransiption bg-white shadow-2xl gap-7 p-4 rounded-md'>
        <h1 className=' text-[64px] p-2 from-[#7949EE] to-[#46DEE6] bg-gradient-to-r inline-block text-transparent bg-clip-text font-bold'>
          Finance
        </h1>
        <p className='py-2 px-5 text-center'>
          Finance is the comprehensive financial management app that helps you keep track of your income and expenditure, reach your savings goals and make informed financial decisions.
        </p>
      </div>
      <div className='col-span-2 flex justify-center items-center flex-col'>
        <h2 className='dark:text-white text-center text-2xl font-bold py-4'>BTC <SpanComponent text='Live'/> Chart</h2>
        <Btc/>
      </div>
    </>
  )
}
