import React from 'react'

export default function Row({children}) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 '>
        {children}
    </div>
  )
}
