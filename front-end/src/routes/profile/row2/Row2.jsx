import React, { useState } from 'react'
import ChartLine from '../../../components/chartLine/ChartLine'
import Additions from '../../../components/additions/Additions '
export default function Row2({userData, cardSelected, seeCardSelected, setDataCounter, dataCounter}) {
  const [dataChart, setDataChart] = useState({datesRevenue:[], valuesRevenue:[]})
  const hookSetDataChart = (e) => {
    setDataChart(e)
  }

  const addNewData = (obj) => {
    const mergedArray = [];
    dataChart.datesRevenue.forEach((e, i)=>{
        mergedArray.push({
          date: dataChart.datesRevenue[i],
          value: dataChart.valuesRevenue[i]
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

    setDataChart({ datesRevenue: newExitsDates, valuesRevenue: newExitsValue });
  };

  return (
    <>
      {userData && userData.userId && (
        <>
          <ChartLine 
            userData={userData} 
            statusAction='revenue' 
            text='revenue' 
            dataChart={dataChart} 
            hookSetDataChart={hookSetDataChart} 
            setDataCounter={setDataCounter}
          />
          <Additions 
            seeCardSelected={seeCardSelected} 
            cardSelected={cardSelected} 
            value='revenue' 
            addNewData={addNewData} 
            setDataCounter={setDataCounter}
            dataCounter={dataCounter}
          />
        </>
      )}
    </>
  )
}
