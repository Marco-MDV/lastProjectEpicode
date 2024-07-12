import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip} from "chart.js";
import { Line } from "react-chartjs-2";
import UseForGet from '../../../../../use/UseForGet';
import SkeletonChartLoade from '../../../../skeletonChartLoade/SkeletonChartLoade';
import Error from '../../../../error/Error';
import { useSelector } from 'react-redux';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip)

export default function Btc() {
    const [loader, setLoader] = useState(true)
    const changeLoader = () => {
        setLoader(!loader)
    }
    const [err, setError] = useState(false)
    const changeError = () => {
        setError(!err)
    }
    const [dates, setDates] = useState([])
    const [value, setValue] = useState([])

    const darkmode = useSelector((state)=>state.theme.value)

    const data = {
        labels: dates,
        datasets:[{
            labels:'BitCoin',
            data: value,
            borderColor:'#6A75EB',
            backgroundColor:'trasparent',
            pointBorderColor:`${darkmode?'#000000':'#6A75EB'}`
        }]
    }
    const options ={
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
              color: `${darkmode?'#6A75EB':'#000000'}`,
            },
          },
          y: {
            ticks: {
                display: true,
            },
            grid: {
              drawBorder: true,
              display: true,
              color: `${darkmode?'#6A75EB':'#000000'}`,
            }, 
          }
        },
    };

    const fetchData = async () => {
        try {
            const coin = await UseForGet(process.env.REACT_APP_ENDPOINT_COIN_BITCOIN, changeLoader, changeError);
            const covertData = new Date(coin.timestamp)
            try {
                setDates(prevDates => [
                    ...prevDates,
                    covertData.toLocaleString()
                ])
                setValue(prevValue => [
                    ...prevValue,
                    Number(coin.data.priceUsd)
                ])
            } catch (error) {
                console.log(error);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 20000); 
        return () => clearInterval(interval); 
    }, []);
    
                
    return (
        <>
            {!loader && !err && (
                        <Line
                            data={data}
                            options={options}
                        ></Line>
                    )}
            {loader && !err && (
                <SkeletonChartLoade/>
            )}
            {err && !loader &&(
                <Error status={404} message="Something went wrong, please try again later"/>
            )}
        </>
    )
}
