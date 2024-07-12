import React from 'react'
import { Link } from 'react-router-dom'
import TogglerModeButton from '../togglerModeButton/TogglerModeButton'

export default function DownNav({handleLogout, token, headler}) {
    return (
        <div className='flex flex-col justify-between h-full'>
            {token && (
                <div className='w-full flex flex-col' id='logOut'>
                    <label className='border-t-2 border-t-black dark:border-t-white mt-3'></label>
                    <button className='flex gap-2 justify-center items-center dark:hover:bg-slate-900 hover:bg-slate-400 rounded-md w-full p-2 mt-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" /></svg>
                        <Link to='/' onClick={handleLogout}>
                            Log Out
                        </Link>
                    </button>
                </div>
            )}
            <div className='flex justify-center items-center gap-2 flex-col'>
                <p>
                    Change mode:
                </p>
                <TogglerModeButton headler={headler}/>
            </div>
        </div>
    )
}
