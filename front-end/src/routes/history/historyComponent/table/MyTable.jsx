import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SpanComponent from '../../../../components/spanComponent/SpanComponent';
import ModalChangeAction from './modalChangeAction/ModalChangeAction';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoaderTableActions from '../../../../components/loaders/LoaderTableActions';
import ErrorRegistration from '../../../../components/errors/ErrorRegistration';
import LoaderChart from '../../../../components/loaders/LoaderChart';
import Table0 from './table0/Table0';
import TableComponent from './tableComponent/TableComponent';
import ButtonNewCall from './buttonNewCall/ButtonNewCall';

export default function MyTable({ typeData }) {
    const navigator = useNavigate()
    const { cardId } = useParams();
    const [value, setValue] = useState([]);
    const darkmode = useSelector((state) => state.theme.value);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showValue, setShowValue] = useState(false);

    const token = localStorage.getItem('token: ');

    const [err, setErr] = useState(false);
    const [loader, setLoader] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    const [loaderTable, setLoaderTable] = useState(true);
    const [errTable, setErrTable] = useState(false);
    const [errMessageTable, setErrMessageTable] = useState('');
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totPage, setTotPage] = useState(0)
    const getInfo = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT_BACKEND}/historySingleCard`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cardId, action: typeData, page , pageSize}),
            });
            if (response.ok) {
                const data = await response.json();
                setValue(data.expenditure || data.revenue);
                setLoaderTable(false);
                setTotPage(data.totPage)
            } else {
                setLoaderTable(false);
                setErrTable(true);
                setErrMessageTable('not possible to get the data');
                localStorage.removeItem('token: ');
                localStorage.removeItem('newToken');
                navigator('/')
            }
        } catch (error) {
            console.log(error);
            setLoaderTable(false);
            setErrTable(true);
            setErrMessageTable(error.message);
            localStorage.removeItem('token: ');
            localStorage.removeItem('newToken');
            navigator('/')
        }
    };

    useEffect(() => {
        getInfo();
    }, [page, totPage]);

    useEffect(() => {
        if (value.length > 0) {
            setShowValue(true);
        } else {
            setShowValue(false);
        }
    }, [value]);

    return (
        <>
            {!loaderTable && !errTable && (
                <>
                    {!showValue && !loader && !err && (
                        <div className={`${darkmode ? 'dark' : ''} flex justify-center items-center`}>
                            <Table0 token={token}/>
                        </div>
                    )}
                    {showValue && (
                        <div>
                            <SpanComponent text={typeData} classCustom='text-3xl py-5' />
                            <div className={`${darkmode ? 'dark' : ''} w-full h-full text-left relative flex flex-col justify-center items-center`}>
                                <TableComponent
                                    value={value}
                                    typeData={typeData}
                                    setValue={setValue} 
                                    setLoader={setLoader} 
                                    setErrMessage={setErrMessage} 
                                    setErr={setErr}
                                    setSelectedRow={setSelectedRow}
                                />
                                <ButtonNewCall page={page} setPage={setPage} totPage={totPage}/>
                                {loader && !err && (
                                    <LoaderTableActions />
                                )}
                                {!loader && err && (
                                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-custom-gradient-history w-full h-full'>
                                        <ErrorRegistration message={errMessage} />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {selectedRow && <ModalChangeAction selectedRow={selectedRow} setSelectedRow={setSelectedRow} setData={setValue} setLoader={setLoader} setErrMessage={setErrMessage} setErr={setErr} />}
                </>
            )}
            {loaderTable && !errTable && (
                <LoaderChart />
            )}
            {!loaderTable && errTable && (
                <ErrorRegistration message={errMessageTable} />
            )}
        </>
    );
}


