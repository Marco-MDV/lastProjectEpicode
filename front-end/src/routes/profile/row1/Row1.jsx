import React from 'react'
import UserArea from './userArea/UserArea'
import Cards from './cards/Cards'

export default function Row1({userData , setUserData, handleCardSelect, handleCardSelectSee}) {
  return (
    <>
      {userData && userData.userId && (
        <>
          <UserArea userData={userData} setUserData={setUserData}/>
          <Cards userData={userData} handleCardSelect={handleCardSelect} handleCardSelectSee={handleCardSelectSee}/>
        </>
      )}
    </>
  )
}
