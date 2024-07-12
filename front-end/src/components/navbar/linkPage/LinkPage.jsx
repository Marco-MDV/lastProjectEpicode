import React from 'react'
import { Link } from 'react-router-dom'

export default function LinkPage({path, text, icon}) {
  return (
    <li className='dark:hover:bg-slate-900 hover:bg-slate-400 rounded-md w-full p-2' id={text}>
        <button className='flex gap-2 items-center'>
          <Link to={`/${path}`} className='flex gap-2'>
            {icon}
            <span>{text}</span>
          </Link>
        </button>
    </li>
  )
}
