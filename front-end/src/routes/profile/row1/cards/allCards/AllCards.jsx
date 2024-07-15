import React from 'react'
import Card from '../card/Card'
import Slider from "react-slick"

export default function AllCards({ cards, handleCardSelect, userId, deleteCards, setMyCards, handleCardSelectSee, setShowModal, }) {
  const settings = {
    dots: false,
    infinite: cards.length > 1, 
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: cards.length > 1, 
    autoplaySpeed: 2000,
    pauseOnHover: true,
    className: "h-full w-full !flex justify-center items-center"
  }

  return (
    <Slider {...settings} >
      {cards.map((card, i) => {
        return <Card key={card._id} setShowModal={setShowModal} card={card} handleCardSelect={handleCardSelect} userId={userId} cards={cards} deleteCards={deleteCards} setMyCards={setMyCards} handleCardSelectSee={handleCardSelectSee} />
      })}
    </Slider>
  )
}

