import React from 'react'
import SpanComponent from '../../../../../components/spanComponent/SpanComponent'
import { Link } from 'react-router-dom'

export default function Table0({token}) {
    return (
        <div className=' text-dark dark:text-white'>
            <div className='w-[300px]'>
                <div className='bg-[#2C2C2C] text-left rounded-t-lg'>
                    <p className='text-3xl pl-4 py-2'>
                        <SpanComponent text='table' />
                    </p>
                </div>
                <div className='grid grid-rows-2 rounded-b-md border-2 border-x-[#CBCBCB]'>{/* #CBCBCB */}
                    <div className='grid grid-cols-2 text-center items-center border-b-2 border-b-[#CBCBCB]'>
                        <div className='border-r-2 border-r-[#CBCBCB] h-full flex justify-center items-center'>
                            <p className='p-2 '>Actions Found</p>
                        </div>
                        <p className='p-2'>0</p>
                    </div>
                    <div className='grid grid-cols-2 text-center items-center'>
                        <div className='border-r-2 border-r-[#CBCBCB] h-full flex justify-center items-center'>
                            <p className='p-2'>if you want back profile page for add actions</p>
                        </div>
                        <p className='p-2'><Link to={`/profile/${token}`}><SpanComponent text='click me' /></Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
