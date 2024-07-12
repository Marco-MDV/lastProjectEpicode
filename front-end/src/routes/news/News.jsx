import React, { useEffect, useState } from 'react'
import SpanComponent from '../../components/spanComponent/SpanComponent'
import SkeletonNews from './SkeletonNews'
import { Carousel } from 'flowbite-react'
import CardNewsPage from './CardNewsPage'
import ErrorRegistration from '../../components/errors/ErrorRegistration'

export default function News() {
    const [loader, setLoader]=useState(true)
    const hookSetLoader = ()=>{setLoader(!loader)}

    const [err, setErr] = useState(false)
    const hookSetErr = ()=>{setErr(err)}
    const [news, setNews] = useState([])

    const [errorMessage, setErrorMessage] = useState('')
    const getNews =async()=>{
        try {
            const call = await fetch(`${process.env.REACT_APP_ENDPOINT_NEWS_FINANCE_PAGE}?page=0&size=5&apikey=${process.env.REACT_APP_ENDPOINT_NEWS_FINANCE_KEY}`,{
                method:'GET'
            })
            if (call.ok) {
                const news = await call.json()
                setLoader(false)
                setNews(news.content)
            }else{
                setLoader(false)
                setErr(true)
                setErrorMessage('Failed to load news')
            }
        } catch (error) {
            setLoader(false)
            setErr(true)
            setErrorMessage('Failed to load news')
        }
    }
    useEffect(()=>{getNews()},[])

  return (
    <main className={`w-full min-h-dvh flex flex-col justify-center gap-10 items-evenly`}>
        <h1 className='text-3xl font-semibold dark:text-white dark:customTransiption mb-10 text-center p-3'> News <SpanComponent text='24h' /></h1>
        {loader && !err &&(<SkeletonNews loader={loader}/>)}
        {!loader && !err &&(
            <div>
                <Carousel>
                    {
                        news.map((singleNew, i)=> <CardNewsPage singleNew={singleNew} key={i}/>)
                    }
                </Carousel>
            </div>
        )}
        {!loader && err &&(<ErrorRegistration message={errorMessage}/>)}
    </main>
  )
}
