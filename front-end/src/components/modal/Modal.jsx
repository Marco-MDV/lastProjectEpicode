import React, { useState } from 'react';
import SpanComponent from '../spanComponent/SpanComponent';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../redux/setBoleanStateModal'
import LoaderTableActions from '../loaders/LoaderTableActions'

export default function Modal({ fillCards, userId }) {
    const change = useDispatch()
    const see = useSelector((state) => state.see.value)
    const [dataCard, setDataCard] = useState({
        Date: '',
        PAN: '',
        CVV: '',
    })

    const handleChange = (e) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        setDataCard({
            ...dataCard,
            [e.target.name]: onlyNums
        });
    };

    const handleKeyDown = (e) => {
        if (["e", "+", "-",",","."].includes(e.key)) {
            e.preventDefault();
        }
    };

    const [warning, setWarning] = useState(false)
    const changeWarning = () => {
        setWarning(!warning)
    }

    const [alert, setAlert] = useState(false)
    const changeAlert = () => {
        setAlert(!alert)
    }

    const [loader, setLoader] = useState(false)

    const addCard = async () => {
        if (dataCard.CVV === '' || dataCard.PAN === '' || dataCard.Date === '') {
            setWarning(true)
        } else if (dataCard.CVV.length !== 3 || dataCard.PAN.length !== 16 || dataCard.Date.length !== 8) {
            setAlert(true)
        } else {
            setLoader(true)
            try {
                const call = await fetch(`${process.env.REACT_APP_ENDPOINT_BACKEND}/addCard`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token: ')}`
                    },
                    body: JSON.stringify({ useId: userId, card: dataCard })
                })
                if (call.ok) {
                    const result = await call.json()
                    fillCards(result)
                    change(toggleModal())
                    setLoader(false)
                } else {
                    setLoader(false)
                    setWarning(true)
                    setAlert(false)
                }
            } catch (error) {
                console.log(error);
                setWarning(true)
                setAlert(false)
                setLoader(false)
            }
        }
    }


    return (
        <>
            {!loader && (
                <div className={`${see ? 'z-20 opacity-100 duration-800' : 'z-[-2] opacity-0 duration-800'} fixed inset-0 z-20 flex justify-center items-center bg-custom-gradient`}>
                    <div className='min-w-[300px] p-5 rounded bg-slate-300 flex flex-col justify-center items-center gap-5 relative group'>
                        <button className='absolute top-1 left-1 opacity-0 group-hover:opacity-100 duration-500' onClick={() => change(toggleModal())}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-red-700 size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                        </button>
                        <h3 className='text-2xl'><SpanComponent text='New card' /></h3>
                        <form className='flex flex-col bg-slate-200 rounded-md p-5 gap-10 shadow-2xl' id='formNewCard'>
                            <label className='flex flex-col'>
                                <SpanComponent text='PAN:' />
                                <input type="number" name="PAN" placeholder='insert PAN' className='p-2 rounded' onChange={handleChange} onKeyDown={handleKeyDown} min={16} max={16} />
                            </label>
                            <label className='flex flex-col'>
                                <SpanComponent text='CVV:' />
                                <input type="number" name="CVV" placeholder='insert CVV' className='p-2 rounded' onChange={handleChange} onKeyDown={handleKeyDown} min={3} max={3} />
                            </label>
                            <label className='flex flex-col'>
                                <SpanComponent text='Expiration Date:' />
                                <input type="date" name="Date" className='p-2 rounded' onChange={handleChange} onKeyDown={handleKeyDown} />
                            </label>
                        </form>
                        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white p-3 rounded' onClick={addCard}>Send</button>
                        <div className={`${warning ? 'z-30 opacity-1' : 'z-[-2] opacity-0'} duration-800 flex items-center justify-between text-sm text-red-800 border-2 border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 min-w-[200px]`}>
                            <div className='flex gap-3 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                                <p>Fill all fields</p>
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
                                <p>Please insert 16 numbers for PAN, 3 numbers for CVV and a correct date</p>
                            </div>
                            <button onClick={changeAlert}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {loader && !alert && !warning && (
                <LoaderTableActions />
            )}
        </>
    );
}
