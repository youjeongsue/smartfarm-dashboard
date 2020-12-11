import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ComparePlot from '../plots/ComparePlot';

import file from '../../../shared/data/PF_0010019.csv';
import file2 from '../../../shared/data/PF_0006023.csv';

import './CompareVis.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../shared/css/shadow.css';

registerLocale("ko", ko);

const row = d => {
    d['senVal'] = +d['senVal'];
    return d;
}

const CompareVis = () => {
    const [data, setData] = useState(null);
    const [data2, setData2] = useState(null);
    const [inputs, setInputs] = useState({
        code: null,
        farm: null
    })
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [inputsForPlot, setInputsForPlot] = useState();

    useEffect(() => {
        csv(file, row).then(setData);
        csv(file2, row).then(setData2);
    }, []);

    const onInputsChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
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
            data2: data2,
            code: inputs.code,
            farm: inputs.farm,
            startDate: startDate,
            endDate: endDate
        })
    }

    const { code, farm } = inputs;

    if (!data || !data2) return (
        <Spinner animation="border" role="status" />
    )
    return (
        <div className='container'>
            <div className='row compare-vis-filter-wrapper shadow'>
                <div className='col'>
                    <div className='row'>
                        <p className='inline filter-name'>농가 코드</p>
                        <input className='select-wrapper' type='text' name='farm' value={farm} onChange={onInputsChange} />
                    </div>
                    <div className='row'>
                        <p className='inline filter-name'>변수</p>
                        <select className='select-wrapper' name='code' value={code} onChange={onInputsChange}>
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
                        />
                        <p>~</p>
                        <DatePicker
                            locale='ko'
                            className='date'
                            selected={endDate}
                            onChange={onEndDateChange}
                            dateFormat='yyyy.MM.dd(eee)'
                        />
                    </div>
                    <div className='row float-right'>
                        <Button variant='dark' size='sm' className='filtering-button' onClick={onClick}>검색</Button>
                    </div>
                </div>
            </div>
            <div className='row'>
                {inputsForPlot &&
                    <ComparePlot inputsForPlot={inputsForPlot} />
                }
            </div>
        </div>
    )
}

export default CompareVis;