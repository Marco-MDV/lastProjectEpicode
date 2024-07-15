import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Grid from './grid/Grid'
import Row1 from './row1/Row1'
import { useDispatch } from 'react-redux'
import {setLoaderFalse, setLoaderTrue}from'../../redux/setLoaderSlice'
import {setErrorTrue, setErrorFalse}from '../../redux/setErrorSlice'
import Row2 from './row2/Row2'
import Row3 from './row3/Row3'


export default function Profile({handleLogin}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({})
  const {token} = useParams()
  const decodeToken = async()=>{
    dispatch(setLoaderTrue(true))
    dispatch(setErrorFalse(false))
    try {
      const call = await fetch(`${process.env.REACT_APP_ENDPOINT_BACKEND}/decodeToken`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      })
      if (call.ok) {
        const result = await call.json()
        setUserData(result)
        localStorage.setItem('token: ', token)
        dispatch(setLoaderFalse(false))
        handleLogin(token)
      }else{
        dispatch(setLoaderFalse(false))
        dispatch(setErrorTrue(true))
        localStorage.removeItem('token: ')
        localStorage.removeItem('newToken')
        navigate('/')
        console.log('invalid token');
      }
    } catch (error) {
      localStorage.removeItem('token: ')
      localStorage.removeItem('newToken')
      navigate('/')
      console.log(error.message);
    }
  }
  useEffect(()=>{
    decodeToken();
  },[])
  const [cardSelected, setCardSeted] = useState('')
  const [seeCardSelected, setSeeCardSelected] = useState({cardNumber:'', state:false}) 
  const handleCardSelectSee = (cardNumber) => {
    if (cardNumber !== ' ') {
      setSeeCardSelected({cardNumber:cardNumber, state:true})
    }
  }
  const handleCardSelect = (cardId) => {
    const id = String(cardId)
    setCardSeted(id)
  }




  const [dataRevenues, setDataRevenues] = useState([])
  const [dataExpenditures, setDataExpenditures] = useState([])


  return (
    <Grid>
      <Row1 userData={userData} setUserData={setUserData} handleCardSelect={handleCardSelect} handleCardSelectSee={handleCardSelectSee} dataRevenues={dataRevenues} dataExpenditures={dataExpenditures}/>
      <Row2 userData={userData} seeCardSelected={seeCardSelected} cardSelected={cardSelected} setDataCounter={setDataRevenues} dataCounter={dataRevenues}/>
      <Row3 userData={userData} seeCardSelected={seeCardSelected} cardSelected={cardSelected} setDataCounter={setDataExpenditures} dataCounter={dataExpenditures}/>
    </Grid>
  )
}
