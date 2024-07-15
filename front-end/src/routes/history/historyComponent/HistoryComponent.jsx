import React from 'react'
import MyTable from './table/MyTable'
import SpanComponent from '../../../components/spanComponent/SpanComponent'

export default function HistoryComponent() {
  return (
    <>
      <div>
        <SpanComponent text='Revenues:' classCustom='py-5 text-2xl'/>
        <MyTable typeData='revenues'/>
      </div>
      <div>
        <SpanComponent text='Expenditures:' classCustom='py-5 text-2xl'/>
        <MyTable typeData='expenditures'/>
      </div>
    </>
  )
}
