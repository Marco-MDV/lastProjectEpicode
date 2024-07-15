import React, { useEffect, useState } from 'react';
import CounterComponent from './counterComponent/CounterComponent';

export default function Counter({  statusAction, dataCounter }) {
    const [tot, setTot] = useState(0);
    const [customColor, setCustomColor] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        let total = 0;
        dataCounter.map(action=>{
            total += action
        })
        setTot(total);

        if (statusAction === 'exitsValue') {
            setCustomColor('red')
            setType('Exits')
        } else if (statusAction === "valuesRevenue") {
            setCustomColor('green')
            setType('Revenue')
        }
    }, [dataCounter, statusAction]);

    return (
        <CounterComponent num={tot} customColor={customColor} type={type} />
    );
}
