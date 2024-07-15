import React, { useEffect, useState } from 'react'
import UseForGet from '../../../../use/UseForGet';
import Error from '../../../error/Error';
import SkeletonNews from '../../../skeletonNews/SkeletonNews';
import CardNews from './cardNews/CardNews';
import CounterOfUsers from './counterOfUsers/CounterOfUsers';
import { Carousel } from 'flowbite-react';


export default function Content2() {
  const [news, setNews] = useState([])
  const [loader, setLoader] = useState(true)
  const changeLoader = () => {
    setLoader(!loader)
  }
  const [err, setError] = useState(false)
  const changeError = () => {
    setError(!err)
  }

  const fetchData = async () => {
    try {
      const dataNews = await UseForGet(process.env.REACT_APP_ENDPOINT_NEWS_FINANCE, changeLoader, changeError)
      setNews(dataNews.content)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => { fetchData() }, [])
  return (
    <>
      {!loader && !err && (
        <div className='col-span-2'>
          <Carousel pauseOnHover indicators={true} leftControl=" " rightControl=" ">
            {
              news.map((item, i) => {
                return (
                  <CardNews title={item.title} link={item.link} image={item.image} key={i} />
                )
              })
            }
          </Carousel>
        </div>
      )}
      {loader && !err && (
        <SkeletonNews />
      )}
      {err && !loader && (
        <div className='col-span-2 flex justify-center items-center'>
          <Error status={404} message="Something went wrong, please try again later" />
        </div>
      )}
      <CounterOfUsers />
    </>
  )
}
