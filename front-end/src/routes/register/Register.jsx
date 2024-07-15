import React, { useState } from 'react'
import sanitizeHtml from 'sanitize-html'
import LabelCustom from '../../components/labelCustom/LabelCustom'
import GoogleButton from '../../components/googleButton/GoogleButton'
import { useSelector } from 'react-redux'
import InputFile from '../../components/inputFile/InputFile'
import FormSelectElement from '../../components/formSelectElement/FormSelectElement'
import LoaderRegister from '../../components/loaders/LoaderRegister'
import ErrorRegistration from '../../components/errors/ErrorRegistration'
import { useNavigate } from 'react-router-dom'

export default function Register({ onRegister }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [err, setErr] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const darkMode = useSelector((state) => state.theme.value)
    const [formData, setFormData] = useState({ role: 'user' })
    const [img, setImg] = useState({})

    const changeLoader = () => {
        setLoader(!loader)
    }

    const changeError = () => {
        setErr(!err)
    }

    const getInfo = (e) => {
        let sanitizedValue = e.target.value


        if (e.target.type === 'email') {
            sanitizedValue = sanitizeHtml(sanitizedValue, {
                allowedTags: [], 
                allowedAttributes: {} 
            })
        } else {
            sanitizedValue = sanitizeHtml(sanitizedValue) 
        }

        setFormData({
            ...formData,
            [e.target.name]: sanitizedValue
        })
    }

    const handleImg = (e) => {
        setImg(e.target.files[0])
    }

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(String(email).toLowerCase())
    }

    const sanitizeFormData = () => {
        const sanitizedData = {}
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'Email') {
                sanitizedData[key] = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {}
                })
            } else {
                sanitizedData[key] = sanitizeHtml(value)
            }
        })
        return sanitizedData
    }

    const registration = async (e) => {
        e.preventDefault()
        const sanitizedData = sanitizeFormData()
        if (!validateEmail(sanitizedData.Email)) {
            setErrorMessage("Invalid email address")
            changeError()
            return
        }
        const data = new FormData()
        Object.entries(sanitizedData).forEach(([key, value]) => {
            data.append(key, value)
        })
        data.append('img', img)
        try {
            changeLoader()
            const call = await fetch(`${process.env.REACT_APP_ENDPOINT_BACKEND}/registration`, {
                method: 'POST',
                body: data
            })
            if (call.ok) {
                const token = await call.json()
                setLoader(false)
                navigate(`/profile/${token}`)
            } else {
                setLoader(false)
                setErrorMessage("Registration failed")
                changeError()
            }
        } catch (error) {
            setLoader(false)
            setErrorMessage(error.message)
            changeError()
        }
    }

    return (
        <div className={`${darkMode ? 'dark' : ''} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${loader ? '' : 'shadow-2xl'} rounded-lg p-8 min-w-[300px] flex justify-center items-center flex-col gap-6 `}>
            {!loader && !err && (
                <>
                    <div className='flex flex-col items-center'>
                        <h1 className='mt-32 md:mt-0 text-[64px] p-2 from-[#7949EE] to-[#46DEE6] bg-gradient-to-r inline-block text-transparent bg-clip-text font-bold'>
                            Finance
                        </h1>
                        <form className='grid grid-cols-1 md:grid-cols-2 gap-4' id='myForm'>
                            <LabelCustom text='Name' type='text' getInfo={getInfo} />
                            <LabelCustom text='Surname' type='text' getInfo={getInfo} />
                            <LabelCustom text='Email' type='email' getInfo={getInfo} />
                            <InputFile handleImg={handleImg} />
                            <FormSelectElement defaultText='Select a role:' choices={['user', 'consultant', 'trader']} classLabel={'dark:text-white dark:customTransiption '} classForm={'flex flex-col gap-2 '} classSelect={'border-2 border-input rounded-md px-2 py-3 dark:border-transparent dark:customTransiption border border-gray-300'} getInfo={getInfo} name='role' />
                            <LabelCustom text='Password' type='password' getInfo={getInfo} />
                        </form>
                    </div>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={registration}>Register</button>
                    <label className='w-3/4 h-px bg-gray-300'></label>
                    <div className='flex flex-col items-center gap-2 dark:text-white'>
                        Sign in with
                        <GoogleButton />
                    </div>
                </>
            )}
            {loader && !err && (<LoaderRegister />)}
            {!loader && err && (<ErrorRegistration message={errorMessage} />)}
        </div>
    )
}
