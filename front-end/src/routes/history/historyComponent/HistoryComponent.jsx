import React from 'react'
import MyTable from './table/MyTable'

export default function HistoryComponent() {
  return (
    <>
      <MyTable typeData='revenues' />
      <MyTable typeData='expenditures' />
    </>
  )
}
