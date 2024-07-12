import React from 'react'
import { useParams } from 'react-router-dom'

export default function Delete({id , type, setData, setLoader, setErr, setErrMessage}) {
    const { cardId } = useParams()
    
    const callDelete = async () =>{
        try {
            setLoader(true)
            const callDelete = await fetch(`${process.env.REACT_APP_ENDPOINT_BACKEND}/deleteMovement`,{
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token: ')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idMovement: id, type:type , idCard:cardId})
            })
            if(callDelete.ok){
                const result = await callDelete.json()
                setData(result.newArrActions)
                setLoader(false)
            }else{
                setErrMessage('An error occurred while deleting the movement')
                setErr(true)
                setLoader(false)
            }
        } catch (error) {
            console.log(error.message);
            console.log(error);
            setErrMessage('An error occurred while deleting the movement')
            setLoader(false)
            setErr(true)
        }
    }
    return (
        <td className='border-b-2 border-slate-400 md:p-2 truncate '>
            <div className='w-full h-full flex justify-center items-center'>
                <button className="text-sm text-red-500 hover:text-red-600 p-2 hover:bg-red-300 duration-500 rounded-md hidden lg:block" onClick={callDelete}>Delete</button>
                <button onClick={callDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 lg:hidden text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>
        </td>
    )
}
