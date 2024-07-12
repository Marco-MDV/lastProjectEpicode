import React, { useState, useEffect } from 'react';
import SpanComponent from '../spanComponent/SpanComponent';
import { useSelector } from 'react-redux';
import LoaderCard from '../loaders/LoaderCard';
import ErrorRegistration from '../errors/ErrorRegistration';

export default function CustomModal({ showModal, setShowModal, setMyCards, userId }) {
    const newIdCard = useSelector((state) => state.postId.value);
    const [loader, setLoader] = useState(false)
    const [err, setErr] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [newData, setNewData] = useState({
        idCard: String(newIdCard),
        idUser: userId,
        Date: '',
        PAN: '',
        CVV: '',
    });

    useEffect(() => {
        setNewData((prevData) => ({
            ...prevData,
            idCard: String(newIdCard),
        }));
    }, [newIdCard]);

    const heandler = (e) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        setNewData({
            ...newData,
            [e.target.name]: onlyNums,
        });
    };

    const handleKeyDown = (e) => {
        if (['e', '+', '-'].includes(e.key)) {
            e.preventDefault();
        }
    };

    const heandlerShowModal = () => { setShowModal(!showModal) };

    const [warning, setWarning] = useState(false)
    const changeWarning = () => {
        setWarning(!warning)
    }

    const [alert, setAlert] = useState(false)
    const changeAlert = () => {
        setAlert(!alert)
    }

    const modCard = async () => {
        if (newData.CVV === '' || newData.PAN === '' || newData.Date === '') {
            setWarning(true)
        } else if (newData.CVV.length !== 3 || newData.PAN.length !== 16 || newData.Date.length !== 8) {
            setAlert(true)
        } else {
            try {
                setLoader(true)
                const call = await fetch(`${process.env.REACT_APP_ENDPOINT_BACKEND}/updateCard`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token: ')}`
                    },
                    body: JSON.stringify(newData)
                });
                if (call.ok) {
                    setLoader(false);
                    const result = await call.json();
                    setMyCards(result);
                    document.querySelector('#formSetInfo').reset();
                    setShowModal(false);
                }else{
                    setLoader(false);
                    setErr(true);
                    setErrorMessage("sorry we can't update your card")
                }
            } catch (error) {
                console.log(error);
                setErrorMessage(error.message);
                setLoader(false);
                setErr(true);
            }
        }
    };

    return (
        <div className={`${showModal ? 'z-20 opacity-100 duration-800' : 'z-[-2] opacity-0 duration-800'} fixed inset-0 z-20 flex justify-center items-center bg-custom-gradient`}>
            {!loader && !err && (
                <div className='min-w-[300px] p-5 rounded bg-slate-300 flex flex-col justify-center items-center gap-5 relative group'>
                    <button className='absolute top-1 left-1 opacity-0 group-hover:opacity-100 duration-500' onClick={heandlerShowModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-red-700 size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                    </button>
                    <h3 className='text-2xl'><SpanComponent text='Set Info' /></h3>
                    <form className='flex flex-col bg-slate-200 rounded-md p-5 gap-10 shadow-3xl text-black' id='formSetInfo'>
                        <label className='flex flex-col'>
                            <SpanComponent text='New PAN:' />
                            <input type="number" name="PAN" placeholder='insert PAN' className='p-2 rounded' onChange={heandler} onKeyDown={handleKeyDown} />
                        </label>
                        <label className='flex flex-col'>
                            <SpanComponent text='New CVV:' />
                            <input type="number" name="CVV" placeholder='insert CVV' className='p-2 rounded' onChange={heandler} onKeyDown={handleKeyDown} />
                        </label>
                        <label className='flex flex-col'>
                            <SpanComponent text='New Expiration Date:' />
                            <input type="date" name="Date" className='p-2 rounded' onChange={heandler} onKeyDown={handleKeyDown} />
                        </label>
                    </form>
                    <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white p-3 rounded' onClick={modCard}>Send</button>
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
            )}
            {loader && !err && (
                <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            )}
            {!loader && err && (
                <ErrorRegistration message={errorMessage}/>
            )}

        </div>
    );
}
