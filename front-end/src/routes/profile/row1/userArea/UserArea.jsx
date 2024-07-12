import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Skeleton from './skeleton/Skeleton'
import Error from '../../../../components/error/Error'
import SpanComponent from '../../../../components/spanComponent/SpanComponent'
import { useNavigate } from 'react-router-dom'
import LoaderTableActions from '../../../../components/loaders/LoaderTableActions'
import ErrorRegistration from '../../../../components/errors/ErrorRegistration'

export default function UserArea({ userData, setUserData }) {
  const navigate = useNavigate()
  const loader = useSelector((state) => state.loader.value)
  const err = useSelector((state) => state.error.value)

  const [loaderImg, setLoaderImg] = useState(false)
  const [errImg, setErrImg] = useState(false)
  const [errImgMessage, setErrImgMessage] = useState('')
  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    const data = new FormData()
    data.append('img', file)
    changeAvatar(data)
  }
  const changeAvatar = async (data) => {
    setLoaderImg(true)
    try {
      const call = await fetch(`${process.env.REACT_APP_ENDPOINT_BACKEND}/changePhoto`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token: ')}`
        },
        body: data
      })
      if (call.ok) {
        const result = await call.json()
        setUserData({ ...userData, img: result.newImg })
        setLoaderImg(false)
        navigate(`/profile/${result.token}`)
      }else{
        setLoaderImg(false)
        setErrImgMessage('Error upload img')
        setErrImg(true)
      }
    } catch (error) {
      setLoaderImg(false)
      setErrImg(true)
      setErrImgMessage('Error upload img')
    }
  }


  return (
    <>
      {!loader && !err && (
        <div className='col-span-2 flex flex-col justify-center md:justify-center items-center md:items-start gap-20 dark:text-white'>
          <div className='relative w-[180px] h-[180px] shadow-inner-custom rounded-full flex justify-center items-center group'>
            {!loaderImg && !errImg && (
              <>
                <figure className=' group-hover:blur-sm w-[150px] h-[150px]'>
                  <img src={userData.img.imgUrl} alt={`img profile ${userData.Name}`} className='rounded-full w-full h-full object-cover' />
                </figure>
                <button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 duration-800 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                  </svg>
                  <input type="file" className='w-full' accept="image/png" name="img" onChange={handlePhotoChange} />
                </button>
              </>
            )}
            {loaderImg && !errImg && (
              <LoaderTableActions classCustom='rounded-full'/>
            )}
            {!loaderImg && errImg && (
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-custom-gradient-history w-full h-full rounded-full'>
                <ErrorRegistration message={errImgMessage}/>
              </div>
            )}
          </div>

          <ul className=' text-xl dark:bg-slate-700 dark:text-white dark:customTransiption bg-white shadow-2xl p-7 rounded'>
            <li><SpanComponent text='Name:' /> {userData.Name}</li>
            <li><SpanComponent text='Email:' /> {userData.Email}</li>
            <li><SpanComponent text='Role:' /> {userData.role}</li>
          </ul>
        </div>
      )}
      {loader && !err && (<Skeleton />)}
      {!loader && err && (<Error status={404} message='sorry something went wrong, please try again later.' span={true} />)}
    </>
  )
}
