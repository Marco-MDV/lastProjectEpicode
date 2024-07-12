import React from 'react'
import { useSelector } from 'react-redux'

export default function TriggerNav({ seeNav }) {
    const darkMode = useSelector((state) => state.theme.value)
    const custoClick = () => {
        document.querySelector('#myNav').classList.remove('animate-swiperLeft')
        document.querySelector('#myNav').classList.add('animate-swiperRight')
        document.querySelector('#TriggerNav').classList.remove('animate-inverseSwiperLeft')
        document.querySelector('#TriggerNav').classList.add('animate-inverseSwiperRight')
    }
    return (
        <button className={`${darkMode?'dark':''} fixed top-4 right-4 z-10 border-2 shadow-2xl hover:bg-slate-400 rounded-md p-2`} onClick={() => { custoClick(); seeNav() }} id='TriggerNav' >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 dark:text-white duration-800">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
    )
}
