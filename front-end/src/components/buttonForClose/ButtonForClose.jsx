import React from 'react'

export default function ButtonForClose({handler}) {
  const custoClick =()=>{
    document.querySelector('#myNav').classList.remove('animate-swiperRight')
    document.querySelector('#myNav').classList.add('animate-swiperLeft')
  }
  return (
    <button onClick={()=>{custoClick(); handler()}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-red-700"><path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
    </button>
  )
}
