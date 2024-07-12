import React from 'react'
import Row from './row/Row'
import Content1 from './row/content1/Content1'
import Content2 from './row/content2/Content2'
import { useSelector } from 'react-redux'

export default function Main() {
  const darkmode = useSelector((state)=>state.theme.value)
  return (
    <main>
      <div className={`${darkmode?'dark':''} grid grid-rows-2 gap-20 p-4`}>
        <Row>
          <Content1/>
        </Row>
        <Row>
          <Content2/>
        </Row>
      </div>
    </main>
  )
}
