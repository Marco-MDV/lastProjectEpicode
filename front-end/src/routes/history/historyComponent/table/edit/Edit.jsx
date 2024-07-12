import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toggleModal } from '../../../../../redux/setModalChangeAction'

export default function Edit({ type, date, description, value, idMovement, setSelectedRow }) {
    const { cardId } = useParams()
    const dispatch = useDispatch()
    
    const changeState = () => {
        dispatch(toggleModal())
        setSelectedRow({
            idMovement: idMovement,
            idCard: cardId,
            value: value,
            description: description,
            date: date,
            type: type
        })
    }

    return (
        <td className='border-b-2 border-slate-400 md:p-2 truncate '>
            <div className='w-full h-full flex justify-center items-center'>
                <button className="text-sm text-gray-500 hover:text-gray-600 p-2 hover:bg-gray-300 duration-500 rounded-md hidden lg:block" onClick={changeState}>Edit</button>
                <button onClick={changeState}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 lg:hidden text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>
            </div>
        </td>
    )
}

