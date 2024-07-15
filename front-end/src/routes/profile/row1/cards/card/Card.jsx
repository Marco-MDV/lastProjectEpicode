import React, { useState } from 'react'
import SpanComponent from '../../../../../components/spanComponent/SpanComponent'
import DeleteButton from './deleteButton/DeleteButton'
import ModButton from './modButton/ModButton'
import ButtonAddCard from './buttonAddCard/ButtonAddCard'
import History from './history/History'
import LoaderTableActions from '../../../../../components/loaders/LoaderTableActions'
import ErrorRegistration from '../../../../../components/errors/ErrorRegistration'

export default function Card({ card, handleCardSelect, userId, cards, deleteCards, setMyCards, handleCardSelectSee, setShowModal }) {
    const slicePan = card.PAN.split(/(.{4})/).filter(Boolean);
    const [loader, setLoader] = useState(false)
    const [err, setErr] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    return (
        <div className=' relative w-full h-full flex justify-center items-center p-20'>
            <div className='relative group p-4 rounded from-[#7949EE] to-[#46DEE6] bg-gradient-to-r text-white flex flex-col gap-8 min-w-[280px] md:min-w-[300px] shadow-xl m-10  md:m-0'>
                <div className='flex gap-4'>
                    {
                        slicePan.map((part, index) => (
                            <p key={index}>{part}</p>
                        ))
                    }
                </div>
                <p>
                    CVV: {card.CVV}
                </p>
                <div className='flex justify-between'>
                    <p>
                        Expiration Date: {card.expirationDate}
                    </p>
                    <div className='relative  bg-gray-400 w-[35px] h-[35px] rounded flex flex-col justify-center items-center gap-2'>
                        <hr className='bg-gray-400 w-full h-[3px]' />
                        <hr className='bg-gray-400 w-full h-[3px]' />
                        <hr className='bg-gray-400 w-full h-[3px]' />
                        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[15px] h-[15px] bg-gray-400 border-2 rounded'></div>
                    </div>
                </div>
                <button className='group-hover:opacity-100 opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 duration-500 bg-white p-2 rounded shadow-xl z-10' onClick={() => { handleCardSelect(card._id); handleCardSelectSee(card.PAN) }}><SpanComponent text='SELECT' /></button>
                <ModButton cardId={card._id} setShowModal={setShowModal} />
                <DeleteButton cardId={card._id} userId={userId} cards={cards} deleteCards={deleteCards} setLoader={setLoader} setErr={setErr} setErrorMessage={setErrorMessage} />
                <ButtonAddCard />
                <History cardId={card._id} />
                {loader && !err && (
                    <LoaderTableActions />
                )}
                {!loader && err && (
                    <div className='absolute top-1/2 left-1/2 transform z-10 -translate-x-1/2 -translate-y-1/2 bg-custom-gradient-history w-full h-full'>
                        <ErrorRegistration message={errorMessage} />
                    </div>
                )}
            </div>
        </div>
    )
}
