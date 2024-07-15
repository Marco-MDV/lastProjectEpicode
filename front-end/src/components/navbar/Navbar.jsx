import React, { useEffect } from 'react'
import TopNav from './topNav/TopNav';
import DownNav from './downNav/DownNav';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/setThemeSlice';



export default function Navbar({  handleLogout , setToken}) {
  const dispatch = useDispatch()
  const headler = () => { dispatch(toggleDarkMode()) }
  const savedToken = localStorage.getItem('token: ');
  const darkMode = useSelector((state) => state.theme.value)
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-slate-700')
    } else {
      document.body.classList.remove('bg-slate-700')
    }
  }, [darkMode])

  



  const trigger = () =>{
    document.querySelector('#myNav').classList.remove('animate-swiperRight')
    document.querySelector('#myNav').classList.add('animate-swiperLeft')
    document.querySelector('#TriggerNav').classList.remove('animate-inverseSwiperRight')
    document.querySelector('#TriggerNav').classList.add('animate-inverseSwiperLeft')
    document.querySelector('#bgNav').classList.remove('z-[3]', 'opacity-100')
    document.querySelector('#bgNav').classList.add('z-[-1]', 'opacity-0')
  }

  

  return (
    <div className='fixed w-full h-full z-[-1] opacity-0' id='bgNav' onClick={trigger}>
      <nav className={`${darkMode ? 'dark left-[-360px] ' : ' left-[-360px]'} h-full fixed top-0 p-2 z-10`} id='myNav'>
        <div className='dark:bg-slate-700 dark:text-white dark:customTransiption bg-white shadow-xl w-full h-full p-8 rounded-lg flex justify-start items-start flex-col gap-5 '>
          <TopNav token={savedToken} />
          <DownNav headler={headler} handleLogout={handleLogout} token={savedToken} />
        </div>
      </nav>
    </div>
  )
}
