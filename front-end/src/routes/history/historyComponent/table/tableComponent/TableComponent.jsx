import React from 'react'
import SpanComponent from '../../../../../components/spanComponent/SpanComponent'
import Edit from '../edit/Edit'
import Delete from '../delete/Delete'

export default function TableComponent({value, typeData, setValue, setLoader, setErrMessage, setErr , setSelectedRow}) {
    return (
        <table className='text-dark dark:text-white rounded table-fixed w-full h-full'>
            <thead>
                <tr className='bg-slate-400 rounded text-xl'>
                    <th className='rounded-tl-lg p-2 w-1/5 max-w-[200px] truncate'><SpanComponent text='value' /></th>
                    <th className='p-2 w-2/5 max-w-[200px] truncate'><SpanComponent text='description' /></th>
                    <th className='p-2 w-1/5 max-w-[200px] truncate'><SpanComponent text='date' /></th>
                    <th className='p-2 w-1/10 max-w-[200px] truncate'><SpanComponent text='modify' classCustom='hidden lg:block' />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 lg:hidden">
                            <defs>
                                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%">
                                    <stop offset="0%" style={{ stopColor: '#7949EE', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#46DEE6', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                            <path strokeLinecap="round" strokeLinejoin="round" stroke="url(#gradient1)" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </th>
                    <th className='rounded-tr-lg p-2 w-1/10 max-w-[200px] truncate'><SpanComponent text='delete' classCustom='hidden lg:block' />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 lg:hidden">
                            <defs>
                                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style={{ stopColor: '#7949EE', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#46DEE6', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                            <path strokeLinecap="round" strokeLinejoin="round" stroke="url(#gradient1)" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </th>
                </tr>
            </thead>
            <tbody>
                {value.map((data) => (
                    <tr key={data._id} className='hover:bg-slate-400 duration-200 w-full'>
                        <td className='border-b-2 border-slate-400 p-2 max-w-[200px] truncate'>{data.expenditure || data.revenue}</td>
                        <td className='border-b-2 border-slate-400 p-2 max-w-[200px] truncate'>{data.description}</td>
                        <td className='border-b-2 border-slate-400 p-2 max-w-[200px] truncate'>{data.date}</td>
                        <Edit setSelectedRow={setSelectedRow} type={typeData} description={data.description} date={data.date} value={data.expenditure || data.revenue} idMovement={data._id} />
                        <Delete id={data._id} type={typeData} setData={setValue} setLoader={setLoader} setErrMessage={setErrMessage} setErr={setErr} />
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
