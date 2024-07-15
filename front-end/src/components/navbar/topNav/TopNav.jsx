import React, { useEffect, useState } from 'react'
import ButtonForClose from '../../buttonForClose/ButtonForClose';
import { Link } from 'react-router-dom';



export default function TopNav({ token }) {
  const [see, setSee] = useState(true)
  useEffect(() => {
    if (token) {
      setSee(false)
    }else{
      setSee(true)
    }
  }, [token])
  const custoClick = () => {
    document.querySelector('#myNav').classList.remove('animate-swiperRight')
    document.querySelector('#myNav').classList.add('animate-swiperLeft')
    document.querySelector('#TriggerNav').classList.remove('animate-inverseSwiperRight')
    document.querySelector('#TriggerNav').classList.add('animate-inverseSwiperLeft')
  }
  return (
    <>
      <div className=' flex justify-end items-center w-full'>
        <ButtonForClose handler={custoClick} />
      </div>
      <ul className=' flex justify-center items-start flex-col gap-5'>
        <li className='dark:hover:bg-slate-900 hover:bg-slate-400 rounded-md w-full p-2'>
          <button className='flex gap-2 items-center'>
            <Link to={`/`} className='flex gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              <span>Home</span>
            </Link>
          </button>
        </li>
        <li className='dark:hover:bg-slate-900 hover:bg-slate-400 rounded-md w-full p-2'>
          <button className='flex gap-2 items-center'>
            <Link to={`/news`} className='flex gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" /></svg>
              <span>News</span>
            </Link>
          </button>
        </li>
        {see && (
          <>
            <li className='dark:hover:bg-slate-900 hover:bg-slate-400 rounded-md w-full p-2'>
              <button className='flex gap-2 items-center'>
                <Link to={`/login`} className='flex gap-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" /></svg>
                  <span>Login</span>
                </Link>
              </button>
            </li>
            <li className='dark:hover:bg-slate-900 hover:bg-slate-400 rounded-md w-full p-2'>
              <button className='flex gap-2 items-center'>
                <Link to={`/register`} className='flex gap-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" /></svg>
                  <span>Register</span>
                </Link>
              </button>
            </li>
          </>
        )}
        {!see &&(
          <li className='dark:hover:bg-slate-900 hover:bg-slate-400 rounded-md w-full p-2'>
            <button className='flex gap-2 items-center'>
              <Link to={`/profile/${token}`} className='flex gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                <span>Profile</span>
              </Link>
            </button>
          </li>
        )}
      </ul>
    </>
  )
}
