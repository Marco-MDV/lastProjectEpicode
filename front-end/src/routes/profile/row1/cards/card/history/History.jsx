import React from 'react'
import SpanComponent from '../../../../../../components/spanComponent/SpanComponent'
import { useNavigate } from 'react-router-dom'

export default function History({cardId}) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/profile/history/${cardId}`)
    }
  return (
    <button className='absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 duration-500 bg-white p-2 rounded shadow-xl z-10' onClick={handleClick}>
        <SpanComponent text='History'/>
    </button>
  )
}
