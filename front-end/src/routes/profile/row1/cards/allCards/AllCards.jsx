import React from 'react'
import Card from '../card/Card'
import { Carousel } from 'flowbite-react'


export default function AllCards({ cards, handleCardSelect, userId, deleteCards, setMyCards , handleCardSelectSee, setShowModal, }) {
  
  return (
    <>
      <div className='w-full h-full'>
      <Carousel
        indicators={false} leftControl=" " rightControl=" " slideInterval={5000} 
      >
        {cards.map((card, i) => {
          return <Card key={card._id} setShowModal={setShowModal} card={card} handleCardSelect={handleCardSelect} userId={userId} cards={cards} deleteCards={deleteCards} setMyCards={setMyCards} handleCardSelectSee={handleCardSelectSee} />
        })}
      </Carousel>
      </div>
    </>
  )
}
