import React from 'react';
import SpanComponent from '../../../../../components/spanComponent/SpanComponent';

const classMap = {
  Exits: {
    border: 'border-red-500',
    bg: 'bg-red-300',
    text: 'text-red-600',
  },
  Revenue: {
    border: 'border-green-500',
    bg: 'bg-green-300',
    text: 'text-green-600',
  },
};

export default function CounterComponent({ num, customColor, type }) {
  const { border, bg, text } = classMap[type] || {};

  return (
    <div>
      <SpanComponent text={`${type}:`} classCustom='text-2xl pb-2 ' />
      <div className={`p-3 border-2 text-lg rounded-lg text-center relative ${border} ${bg} ${text}`}>
        <p>{num}</p>
        <div className={`w-[15px] h-[15px] animate-ping absolute top-[-5px] right-[-5px] ${bg} rounded-full`}></div>
      </div>
    </div>
  );
}