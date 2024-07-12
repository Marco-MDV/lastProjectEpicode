import React, { useState } from 'react'
import GoogleButton from '../../components/googleButton/GoogleButton'
import LabelCustom from '../../components/labelCustom/LabelCustom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoaderRegister from '../../components/loaders/LoaderRegister'
import ErrorRegistration from '../../components/errors/ErrorRegistration'

export default function Login({ onLogin }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const setData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const darkMode = useSelector((state) => state.theme.value)
  const [loader, setLoader] = useState(false)
  const changeLoader = () => {
    setLoader(!loader)
  }
  const [error, setError] = useState(false)
  const changeError = () => {
    setError(!error)
  }

  const [errorMessage, setErrorMessage] = useState('')
  const loginRequest = async () => {
    changeLoader()
    try {
      const request = await fetch(`${process.env.REACT_APP_ENDPOINT_BACKEND}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (request.ok) {
        const { token } = await request.json()
        navigate(`/profile/${token}`)
        onLogin(token)
        changeLoader()
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message)
      setLoader(false)
      changeError()
    }
  }
  return (
    <>
      {!loader && !error && (
        <div className={`${darkMode ? 'dark ' : ''} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-lg p-8 min-w-[300px] flex justify-center items-center flex-col gap-6 dark:bg-slate-700  dark:customTransiption`}>
          <div>
            <h1 className='text-[64px] p-2 from-[#7949EE] to-[#46DEE6] bg-gradient-to-r inline-block text-transparent bg-clip-text font-bold'>
              Finance
            </h1>
            <form className='flex flex-col gap-4'>
              <LabelCustom text='Email' getInfo={setData} type='email' />
              <LabelCustom text='Password' getInfo={setData} type='password' />
            </form>
          </div>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={loginRequest}>Login</button>
          <label className='w-3/4 h-px bg-gray-300'></label>
          <div className='flex flex-col items-center gap-2'>
            <p className='dark:text-white dark:customTransiption'>
              Login in with
            </p>
            <GoogleButton />
          </div>
        </div>
      )}
      {loader && !error && (
        <LoaderRegister/>
      )}
      {!loader && error && (
        <ErrorRegistration message={errorMessage}/>
      )}
    </>
  )
}