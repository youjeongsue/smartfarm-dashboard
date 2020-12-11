import React from 'react';
import { Link } from 'react-router-dom';

import './EnvPlots.css';
import plus from '../../shared/images/plus.png';

import SinglePlot from './plots/SinglePlot';

const EnvPlots = ({ data }) => {
    const renderPlot = (label, code) => {
        return (
            <div className='envplot-wrapper col shadow'>
                <div className='row'>
                    <p className='col'>{label}</p>
                    <div className='col'>
                        <Link to={{
                            pathname: '/visualization',
                            state: {
                                code: code
                            }
                        }}><img src={plus} className='plus float-right' alt='더보기' /></Link>
                    </div>
                </div>
                <div>
                    <SinglePlot data={data} code={code}/>
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='row'>
                {renderPlot("외부온도", 'TE')}
                {renderPlot("내부온도", 'CI')}
                {renderPlot("지온", 'TL')}
                {renderPlot("내부CO2", 'TI')}
                {renderPlot("토양EC", 'EL')}
                {renderPlot("지습", 'HL')}
            </div>
        </div>
    )
}

export default EnvPlots;