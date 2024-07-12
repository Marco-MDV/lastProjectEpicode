import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from 'react-redux';
import SpanComponent from '../../components/spanComponent/SpanComponent';
import SkeletonChartLoade from '../skeletonChartLoade/SkeletonChartLoade';
import ErrorChart from '../errors/ErrorChart';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip)

export default function ChartLine({ userData, statusAction, text, dataChart, hookSetDataChart }) {
    const [loader, setLoader] = useState(true)
    const [err, setErr] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    const darkmode = useSelector((state) => state.theme.value)

    const callData = async () => {
        try {
            const call = await fetch(`${process.env.REACT_APP_ENDPOINT_BACKEND}/action`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token: ')}`
                },
                body: JSON.stringify({ Id: userData.userId, action: statusAction })
            })
            if (call.ok) {
                const result = await call.json()
                hookSetDataChart(result)
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            setErr(true)
            setErrMessage(error.message)
            console.log(error);
        }
    }

    useEffect(() => { callData() }, [])

    const data = {
        labels: dataChart?.exitsDates || dataChart?.datesRevenue,
        datasets: [{
            label: statusAction,
            data: dataChart?.exitsValue || dataChart?.valuesRevenue,
            borderColor: '#6A75EB',
            backgroundColor: 'transparent',
            pointBorderColor: `${darkmode ? '#000000' : '#6A75EB'}`
        }]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    display: false,
                },
                grid: {
                    drawBorder: true,
                    display: true,
                    color: `${darkmode ? '#6A75EB' : '#000000'}`,
                },
            },
            y: {
                ticks: {
                    display: true,
                },
                grid: {
                    drawBorder: true,
                    display: true,
                    color: `${darkmode ? '#6A75EB' : '#000000'}`,
                },
            }
        },
    };

    return (
        <div className='col-span-2 flex justify-center items-center flex-col w-full h-full '>
            <h2 className='text-3xl font-bold dark:text-white'>All <SpanComponent text={text} /></h2>
            {!loader && !err && (
                <Line
                    data={data}
                    options={options}
                />
            )}
            {loader && !err && (
                <SkeletonChartLoade />
            )}
            {!loader && err && (
                <ErrorChart message={errMessage} />
            )}
        </div>
    )
}