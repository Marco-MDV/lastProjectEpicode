import React, { useRef } from 'react'
import { toggleModal } from '../../../../../redux/setModalChangeAction'
import { useDispatch, useSelector } from 'react-redux'
import SpanComponent from '../../../../../components/spanComponent/SpanComponent'
export default function ModalChangeAction({ selectedRow, setSelectedRow, setData , setLoader, setErrMessage, setErr}) {
  const change = useDispatch()
  const changeState = () => { change(toggleModal()) }
  const see = useSelector((state) => state.seeModalChange.value)
  
  const handleKeyDown = (e) => {
    if (["e", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const newData = (e) => {
    setSelectedRow({
      ...selectedRow,
      [e.target.name]: e.target.value
    })
  }
  const sedData = async () => {
    setLoader(true)
    setSelectedRow(false)
    try {
      const call = await fetch(`${process.env.REACT_APP_ENDPOINT_BACKEND}/modAction`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token: ')}`
        },
        body: JSON.stringify(selectedRow)
      })
      if (call.ok) {
        setLoader(false)
        const response = await call.json()
        setData(response.newArrActions)
      }else{
        setErr(true)
        setLoader(false)
        setErrMessage("not possible to update the news info")
      }
    } catch (error) {
      setErr(true)
      setLoader(false)
      console.log(error);
      setErrMessage(error)
    }
  }

  const ref = useRef();

  
  return (
    <div className={`${see ? 'z-20 opacity-100 duration-800' : 'z-[-2] opacity-0 duration-800'} fixed inset-0 z-20 flex justify-center items-center bg-custom-gradient`}>
      <div className='min-w-[300px] p-5 rounded bg-slate-300 flex flex-col justify-center items-center gap-5 relative group'>
        <button className='absolute top-1 left-1 opacity-0 group-hover:opacity-100 duration-500' onClick={changeState}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-red-700 size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
        </button>
        <h3 className='text-2xl'><SpanComponent text='Change value' /></h3>
        <form className='flex flex-col bg-slate-200 rounded-md p-5 gap-10 shadow-2xl' id='formNewCard'>
          <label className='flex flex-col'>
            <SpanComponent text='Value: ' />
            <input type="number" name='value' placeholder={selectedRow.value} className='p-2 rounded' onChange={newData} onKeyDown={handleKeyDown}/>
          </label>
          <label className='flex flex-col'>
            <SpanComponent text='Description: ' />
            <input type="text" name='description' placeholder={selectedRow.description} className='p-2 rounded' onChange={newData} />
          </label>
          <label className='flex flex-col'>
            <SpanComponent text='Date: ' />
            <input name='date' placeholder={selectedRow.date} className='p-2 rounded' onChange={newData} type='text' ref={ref} onFocus={() => (ref.current.type = "date")}/>
          </label>
        </form>
        <button onClick={sedData} type="submit" className='bg-blue-500 hover:bg-blue-700 text-white p-3 rounded'>Send</button>
      </div>
    </div>
  )
}
