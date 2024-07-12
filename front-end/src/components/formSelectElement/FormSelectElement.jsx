import React from 'react'
export default function FormSelectElement({ choices, defaultText, classLabel, classForm, classSelect, getInfo, name }) {
  return (
    <div className={classForm}>
      <label className={classLabel}>{defaultText}</label>
      <select name={name} className={classSelect} onChange={getInfo}>
        {choices.map((choice, i) => <option name={choice} key={i} className='w-full'>{choice}</option>)}
      </select>
    </div>
  )
}
