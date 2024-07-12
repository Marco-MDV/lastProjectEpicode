import React from 'react'

export default function GoogleButton() {
    const resetButton = () =>{
        localStorage.removeItem('token: ')
        localStorage.removeItem('newToken')
    }
    return (
        <button className='py-2 px-4 rounded googleGradient bg-gradient-to-r inline-block text-transparent bg-clip-text font-bold text-4xl dark:text-white dark:customTransiption' onClick={resetButton}>
            <a href={`${process.env.REACT_APP_ENDPOINT_BACKEND}/auth/google`}>
                Google
            </a>
        </button>
    )
}
