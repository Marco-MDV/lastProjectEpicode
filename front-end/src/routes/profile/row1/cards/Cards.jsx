import React, { useEffect, useState } from 'react'
import ZeroCards from './zeroCards/ZeroCards'
import AllCards from './allCards/AllCards'
import Modal from '../../../../components/modal/Modal'
import CustomModal from '../../../../components/customModal/CustomModal'
import LoaderCard from '../../../../components/loaders/LoaderCard'
import ErrorChart from '../../../../components/errors/ErrorChart'

export default function Cards({ userData, handleCardSelect, handleCardSelectSee }) {
  const [stateCards, setStateCards] = useState(false)
  const [loader, setLoader] = useState(true)
  const [err, setErr] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [myCards, setMyCards] = useState([])

  const takeCard = async () => {
    try {
      const cards = await fetch(`${process.env.REACT_APP_ENDPOINT_BACKEND}/searchCard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token: ')}`
        },
        body: JSON.stringify({ id: userData.userId })
      })
      if (cards.ok) {
        const result = await cards.json()
        setMyCards(result)
        if (result.length !== 0) {
          setStateCards(true)
        }
        setLoader(false)
      } else {
        setLoader(false)
        setErr(true)
        setErrorMessage('server error, please try again ')
      }
    } catch (error) {
      setLoader(false)
      setErr(true)
      setErrorMessage(error.message)
      console.log(error);
    }
  }

  const fillCards = (obj) => {
    setMyCards([
      ...myCards,
      obj
    ])
    setStateCards(true)
  }

  const deleteCards = (obj) => {
    setMyCards(obj)
    if (myCards.length <= 1) {
      setStateCards(false)
    }
  }

  useEffect(() => { takeCard() }, [])
  const [showModal, setShowModal] = useState(false);
  return (
    <div className='col-1 flex items-center justify-center'>
      {loader && !err && (
        <LoaderCard />
      )}
      {!loader && err && (
        <ErrorChart message={errorMessage} />
      )}
      {!loader && !err && (
        <>
          {!stateCards && (
            <ZeroCards />
          )}
          {stateCards && (
            <AllCards setShowModal={setShowModal} cards={myCards} deleteCards={deleteCards} handleCardSelect={handleCardSelect} userId={userData.userId} setMyCards={setMyCards} handleCardSelectSee={handleCardSelectSee} />
          )}
        </>
      )}
      <Modal fillCards={fillCards} userId={userData.userId} />
      <CustomModal
        userId={userData.userId}
        showModal={showModal}
        setShowModal={setShowModal}
        setMyCards={setMyCards}
      />
    </div>
  )
}
