import React, { useEffect, useState } from 'react'
import SpanComponent from '../../../../spanComponent/SpanComponent';

export default function CounterOfUsers() {
    const [numberUsers, setNumberUsers] = useState(0);
    const [loader, setLoader] = useState(true)
    const [err, setErr] = useState(false)
    const requestOfNumberUsers = async ()=>{
        try {
            const numb = await fetch(`${process.env.REACT_APP_ENDPOINT_BACKEND}/counterOfUsers`)
            if (numb.ok) {
                const result = await numb.json()
                setLoader(false)
                setErr(false)
               setNumberUsers(result)
            }
        } catch (error) {
            setLoader(false)
            setErr(true)
        }
    }

    useEffect(() => {
        requestOfNumberUsers()
    }, [])

  return (
    <>
        <div className='w-full h-full flex justify-center items-center col-span-2 shadow-2xl rounded-md'>
            <h2 className='text-4xl md:text-8xl font-bold dark:text-white duration-800'>
                <SpanComponent text={numberUsers}/>
                <br />
                USERS
                <br />
                TRUST US
            </h2>
        </div>
    </>
  )
}
