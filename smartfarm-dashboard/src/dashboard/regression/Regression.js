import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';

// import './Regression.css';
import plus from '../../shared/images/plus.png';

import Output from './type/Output';
import Growth from './type/Growth';
import Culture from './type/Culture';

const Regression = () => {
    const [mymodel, setMymodel] = useState([
        {id:1, modelname: '생산량-SVM', category: '생산량', version: '1.1'},
        {id:2, modelname: '배양액-개화기 PH', category: '배양액', version: '1.4.3'},
    ]);

    useEffect(() => {
        const modelid = {
            'userid' : 'wjdtn1912'
        };
        // axios.get("http://192.168.1.17:5000/modelApi/mymodel", { params: modelid }).then(({ data }) => {
        //     setMymodel(data);
        // })
    }, []);

    const renderMyModel = (model_list) => {
        if(!model_list) return null;
        return (
            <div className='row'>
                {model_list.map(model => {
                    return (
                        <div className='my-model-item col-xs-1' key={model.id}>
                            <p>{model.category}</p>
                            <p>{model.modelname}</p>
                            <p>{model.version}</p>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='row my-model-wrapper shadow'>
                <div className='col'>
                    <div className='row'>
                        <div className='col my-model-title'>나의 모델</div>
                        <Link to='/market'><img className='float-right plus' src={plus} alt="" /></Link>
                    </div>
                    {renderMyModel(mymodel)}
                </div>
            </div>
            <div className='row'>
                <Link to='/regression/output' className='market-title'>생산량</Link>
                <Link to='/regression/growth' className='market-title'>생장량</Link>
                <Link to='/regression/culture' className='market-title'>배양액</Link>
            </div>
            <div className='row'>
                <Route exact path='/regression' component={Output} />
                <Route path='/regression/output' component={Output} />
                <Route path='/regression/growth' component={Growth} />
                <Route path='/regression/culture' component={Culture} />
            </div>
        </div>
    )
}

export default Regression;