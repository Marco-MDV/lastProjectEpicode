import React from 'react'
import { useSelector } from 'react-redux'

export default function Grid({children}) {
  const darkmode = useSelector((state)=>state.theme.value)
  return (
    <div className={`${darkmode?'dark':''} grid md:grid-rows-3 grid-cols-1 lg:gap-20 lg:grid-cols-3 md:p-10 px-5`}>
      {children}
    </div>
  )
}
