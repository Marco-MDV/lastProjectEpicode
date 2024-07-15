import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

export default function PieChart({ dataRevenues, dataExpenditures }) {
    const [exits, setExits] = useState(0);
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        const totalExits = dataExpenditures.reduce((acc, value) => acc + value, 0);
        setExits(totalExits);

        const totalRevenue = dataRevenues.reduce((acc, value) => acc + value, 0);
        setRevenue(totalRevenue);
    }, [dataExpenditures, dataRevenues]);

    const data = {
        labels: ['Exits', 'Revenues'],
        datasets: [{
            data: [exits, revenue],
            backgroundColor: ['#FF6384', '#36A2EB'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB']
        }]
    };

    return (
        <div className=''>
            <Doughnut
                data={data}
                options={{
                    plugins: {
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }
                }}
            />
        </div>
    );
}
