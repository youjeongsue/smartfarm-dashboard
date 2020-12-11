import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import DetailPlot from '../plots/DetailPlot';

import file from '../../../shared/data/PF_0010019.csv';
// import file2 from '../../../shared/data/PF_0006044.csv';

import './DetailVis.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../shared/css/shadow.css';


registerLocale("ko", ko);

const row = d => {
    d['senVal'] = +d['senVal'];
    return d;
}

const DetailVis = () => {
    const [data, setData] = useState(null);

    const [code, setCode] = useState('initial');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [inputsForPlot, setInputsForPlot] = useState();

    useEffect(() => {
        csv(file, row).then(setData);
    }, []);

    const onChange = (e) => {
        setCode(e.target.value);
    };

    const onStartDateChange = (e) => {
        setStartDate(e);
    }

    const onEndDateChange = (e) => {
        setEndDate(e);
    }

    const onClick = () => {
        setInputsForPlot({
            data: data,
            code: code,
            startDate: startDate,
            endDate: endDate
        })
    }

    if (!data) return (
        <Spinner animation="border" role="status" />
    )
    return (
        <div className="container">
            <div className='row detail-vis-filter-wrapper shadow'>
                <div className='col'>
                    <div className='row'>
                        <p className='inline filter-name'>변수</p>
                        <select className='select-wrapper' name='code' value={code} onChange={onChange}>
                            <option value='TE'>외부온도(TE)</option>
                            <option value='CI'>내부온도(CI)</option>
                            <option value='HI'>내부습도(HI)</option>
                            <option value='TI'>내부CO2(TI)</option>
                            <option value='EL'>토양EC(EL)</option>
                            <option value='HL'>지습(HL)</option>
                        </select>
                    </div>
                    <div className='row'>
                        <p className='inline filter-name'>날짜</p>
                        <DatePicker
                            locale='ko'
                            className='date'
                            selected={startDate}
                            onChange={onStartDateChange}
                            dateFormat='yyyy.MM.dd(eee)'
                            // isClearable
                        />
                        <p>~</p>
                        <DatePicker
                            locale='ko'
                            className='date'
                            selected={endDate}
                            onChange={onEndDateChange}
                            dateFormat='yyyy.MM.dd(eee)'
                            // isClearable
                        />
                    </div>
                    <div className='row float-right'>
                        <Button variant='dark' size='sm' className='filtering-button' onClick={onClick}>검색</Button>
                    </div>
                </div>
            </div>
            <div className='row'>
                {inputsForPlot &&
                    <DetailPlot inputsForPlot={inputsForPlot} />
                }
            </div>
        </div>
    )
}

export default DetailVis;