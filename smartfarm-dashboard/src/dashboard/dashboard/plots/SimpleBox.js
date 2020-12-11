import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import './SimpleBox.css';

const SimpleBox = ({ data }) => {
    const [sensors, setSensors] = useState({});

    useEffect(() => {
        //1. 데이터가 들어온 마지막 시간대의 데이터 filtering
        const lastData = () => {
            const lastMeasDate = data[data.length-1].measDate;
            const filteredDataByDate = data.filter(row => row.measDate === lastMeasDate);
            return filteredDataByDate;
        }

        //2. 주요한 변수(TE, CI, HI, TI, EL, HL)만 골라내고, 없는 변수는 NULL로 저장
        const selectVal = (filteredData) => {

            const sensors = {};

            const te = filteredData.filter(row => row.fatrCode === 'TE');
            const ci = filteredData.filter(row => row.fatrCode === 'CI');
            const tl= filteredData.filter(row => row.fatrCode === 'TL');
            const ti = filteredData.filter(row => row.fatrCode === 'TI');
            const el = filteredData.filter(row => row.fatrCode === 'EL');
            const eo = filteredData.filter(row => row.fatrCode === 'EO');
            const ei = filteredData.filter(row => row.fatrCode === 'EI');
            const hl = filteredData.filter(row => row.fatrCode === 'HL');

            if(te.length){ sensors.TE = te[0].senVal; } else { sensors.TE = null; }
            if(ci.length){ sensors.CI = ci[0].senVal; } else { sensors.CI = null; }
            if(tl.length){ sensors.TL = tl[0].senVal; } else { sensors.TL = null; }
            if(ti.length){ sensors.TI = ti[0].senVal; } else { sensors.TI = null; }
            if(el.length){ sensors.EL = el[0].senVal; } else { sensors.EL = null; }
            if(eo.length){ sensors.EO = eo[0].senVal; } else { sensors.EO = null; }
            if(ei.length){ sensors.EI = ei[0].senVal; } else { sensors.EI = null; }
            if(hl.length){ sensors.HL = hl[0].senVal; } else { sensors.HL = null; }
            
            return sensors;
        }
        
        setSensors(selectVal(lastData()));
    }, [data]);

    const renderBox = (label, label_eng, senVal) => {
        if(senVal==null) {
            return (
                <div className='simple-box null-box'>
                    <div className='simple-box-label'>{label}({label_eng})</div>
                    <div className='right simple-box-senval-null'>null</div>
                </div>
            )
        }
        return (
            <div className='simple-box normal-box'>
                <div className='simple-box-label'>{label}({label_eng})</div>
                <div className='right simple-box-senval'>{senVal}</div>
            </div>
        )
    }

    if(!sensors) return (
        <Spinner animation="border" role="status" size="sm" />
    );
    return(
        <div className='container simple-box-wrapper'>
            <div className='row'>
                <div className='col'>{renderBox('외부온도', 'TE', sensors.TE)}</div>
                <div className='col'>{renderBox('내부온도', 'CI', sensors.CI)}</div>
                <div className='col'>{renderBox('지온', 'TL', sensors.HI)}</div>
                <div className='col'>{renderBox('내부CO2', 'TI', sensors.TI)}</div>
                <div className='col'>{renderBox('토양EC', 'EL', sensors.EL)}</div>
                <div className='col'>{renderBox('지습', 'HL', sensors.HL)}</div>
                <div className='col'>{renderBox('배액EC', 'EO', sensors.EO)}</div>
                <div className='col'>{renderBox('양액EC', 'EI', sensors.EI)}</div>
            </div>
            <div className='float-right simple-box-date'>
                {data[data.length-1].measDate} 기준
            </div>
        </div>
    );
}

export default SimpleBox;