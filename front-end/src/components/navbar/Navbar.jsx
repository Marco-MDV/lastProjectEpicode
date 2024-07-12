import React, { useEffect } from 'react'
import TopNav from './topNav/TopNav';
import DownNav from './downNav/DownNav';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/setThemeSlice';



export default function Navbar({ token, handleLogout }) {
  const dispatch = useDispatch()
  const headler = ()=>{dispatch(toggleDarkMode())}
  const darkMode = useSelector((state) => state.theme.value)
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-slate-700')
    } else {
      document.body.classList.remove('bg-slate-700')
    }
  },[darkMode])
  return (
    <nav className={`${darkMode ? 'dark left-[-360px] ' : ' left-[-360px]'} h-full fixed top-0 p-2 z-10`} id='myNav'>
      <div className='dark:bg-slate-700 dark:text-white dark:customTransiption bg-white shadow-xl w-full h-full p-8 rounded-lg flex justify-start items-start flex-col gap-5 '>
        <TopNav token={token} />
        <DownNav headler={headler} handleLogout={handleLogout} token={token} />
      </div>
    </nav>
  )
}
