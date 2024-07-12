import React, { useState } from 'react'
import ChartLine from '../../../components/chartLine/ChartLine'
import Additions from '../../../components/additions/Additions '

export default function Row3({ userData, cardSelected, seeCardSelected }) {
  const [dataChart, setDataChart] = useState({exitsDates:[], exitsValue:[]})
  const hookSetDataChart = (e) => {
    setDataChart(e)
  }
  
  const addNewData = (obj) => {
    const mergedArray = [];
    dataChart.exitsDates.forEach((e, i)=>{
        mergedArray.push({
          date: dataChart.exitsDates[i],
          value: dataChart.exitsValue[i]
      });
    })

    const dateToInsert = new Date(obj.date)
    let inserted = false;
    for (let i = 0; i < mergedArray.length; i++) {
      const currentDate = new Date(mergedArray[i].date);
      if (dateToInsert < currentDate) {
        mergedArray.splice(i, 0, { date: obj.date, value: obj.value });
        inserted = true;
        break;
      }
    }

    if (!inserted) {
      mergedArray.push({ date: obj.date, value: obj.value });
    }

    const newExitsDates = mergedArray.map(entry => entry.date);
    const newExitsValue = mergedArray.map(entry => entry.value);

    setDataChart({ exitsDates: newExitsDates, exitsValue: newExitsValue });
  };

  return (
    <>
      {userData && userData.userId && (
        <>
          <ChartLine
            userData={userData}
            statusAction='exits'
            text='exits'
            dataChart={dataChart}
            hookSetDataChart={hookSetDataChart}
          />
          <Additions
            userData={userData}
            seeCardSelected={seeCardSelected}
            cardSelected={cardSelected}
            value='expenditure'
            dataChart={dataChart}
            hookSetDataChart={hookSetDataChart}
            addNewData={addNewData}
          />
        </>
      )}
    </>
  )
}
