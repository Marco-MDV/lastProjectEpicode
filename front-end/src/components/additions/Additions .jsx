import React, { useState } from 'react'
import SpanComponent from '../spanComponent/SpanComponent'
import LoaderTableActions from '../loaders/LoaderTableActions';

export default function Additions({ cardSelected, value, seeCardSelected, addNewData, setDataCounter, dataCounter }) {
    const handleKeyDown = (e) => {
        if (["e", "+", "-", ",", "."].includes(e.key)) {
            e.preventDefault();
        }
    };

    const [data, setData] = useState({
        [value]: '',
        date: '',
        description: ''
    })
    const hookSetData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const [warning, setWarning] = useState(false)
    const changeWarning = () => {
        setWarning(!warning)
    }

    const [alert, setAlert] = useState(false)
    const changeAlert = () => {
        setAlert(!alert)
    }

    const [loader, setLoader] = useState(false)
    const [err, setErr] = useState(false)

    const [message, setMessage] = useState('')

    const uploadData = async () => {
        if (cardSelected === '') {
            setWarning(true)
            setMessage('Please select a card')
        } else if (data.date === '' || data.description === '' || data?.[value] === '') {
            changeAlert()
            setMessage('Fill all fields')
        } else {
            setLoader(true)
            try {
                const call = await fetch(`${process.env.REACT_APP_ENDPOINT_BACKEND}/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token: ')}`
                    },
                    body: JSON.stringify({ cardId: cardSelected, action: data })
                })
                if (call.ok) {
                    const result = await call.json()
                    addNewData({ date: data.date, value: data?.[value] })
                    setDataCounter([
                        ...dataCounter,
                        Number(data?.[value])
                    ])
                    setLoader(false)
                }else{
                    setLoader(false)
                    setMessage('Failed to add new data')
                    setErr(true)
                }
            } catch (error) {
                setLoader(false)
                console.log(error.message);
                setMessage(error.message)
                setErr(true)
            }
        }
    }

    const slicePan = seeCardSelected?.cardNumber.split(/(.{4})/).filter(Boolean);


    const changeAlertFatch=() => {
        setLoader(false)
        setErr(false)
    }

    return (
        <div className='col-1 flex flex-col justify-center items-center bg-slate-300 shadow-2xl rounded-md p-10 mb-10 lg:mb-0'>
            {seeCardSelected?.state && (<div className='flex flex-col justify-center items-center pb-5 w-full'><SpanComponent text='Card seleceted: ' /> <p className='flex gap-3'>{slicePan.map((slice, i) =>
                <span className='text-blue-500' key={i}>{slice}</span>
            )} </p></div>)}
            <div className='flex justify-center items-center h-full w-full bg-slate-200 rounded-sm group flex-col gap-10 shadow-xl relative'>
                <form action="" className='flex flex-wrap w-full'>
                    <div className='flex flex-wrap flex-row w-full justify-between items-center gap-10 p-5'>
                        <label className=''>
                            <p className='text-bold text-2xl'><SpanComponent text='Value:' /></p>
                            <input type="number" name={value} placeholder='insert a number value' className='p-2 rounded w-full' onKeyDown={handleKeyDown} onChange={hookSetData} />
                        </label>
                        <label className=''>
                            <p className='text-bold text-2xl'><SpanComponent text='Date:' /></p>
                            <input type="date" name="date" placeholder='insert the correct' className='p-1 rounded w-full' onChange={hookSetData} />
                        </label>
                    </div>
                    <label className='w-full p-5' >
                        <p className='text-bold text-2xl'><SpanComponent text='Description:' /></p>
                        <input type="text" name="description" className='w-full p-2 rounded' placeholder='insert the argument' onChange={hookSetData} />
                    </label>
                </form>
                <button type="submit" className='opacity-0 group-hover:opacity-100 duration-800 bg-blue-600 text-white p-2 rounded focus:bg-blue-800 mb-2' onClick={uploadData}>Send</button>
                <div className={`${warning ? 'z-30 opacity-1' : 'z-[-2] opacity-0'} duration-800 flex items-center justify-between text-sm text-red-800 border-2 border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 min-w-[200px]`}>
                    <div className='flex gap-3 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>
                        <p className='text-center'>{message}</p>
                    </div>
                    <button onClick={changeWarning}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className={`${alert ? 'z-30 opacity-1' : 'z-[-2] opacity-0'} duration-800 flex items-center justify-between text-sm text-blue-800 border-2 border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 min-w-[250px]`}>
                    <div className='flex gap-3 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <p>{message}</p>
                    </div>
                    <button onClick={changeAlert}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {loader && !err && (
                    <LoaderTableActions classCustom=' z-10 ' />
                )}
                {!loader && err && (
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-custom-gradient-history w-full h-full z-[3]'>
                        <div className={`z-30 opacity-1 duration-800 flex items-center justify-between text-sm text-blue-800 border-2 border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 min-w-[250px]`}>
                            <div className='flex gap-3 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>
                                <p>{message}</p>
                            </div>
                            <button onClick={changeAlertFatch}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
