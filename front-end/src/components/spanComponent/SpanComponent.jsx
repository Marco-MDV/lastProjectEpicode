import React from 'react'

export default function SpanComponent({text, classCustom}) {
  return (
    <span className={`${classCustom} from-[#7949EE] to-[#46DEE6] bg-gradient-to-r font-bold inline-block text-transparent bg-clip-text`}>{text}</span>
  )
}
