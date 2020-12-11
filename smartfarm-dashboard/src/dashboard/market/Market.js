import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';

// import './Market.css';

import Output from './type/Output';
import Growth from './type/Growth';
import Culture from './type/Culture';

const Market = () => {
    return (
        <div className='container'>
            <div className='row'>
                <Link to='/market/output' className='market-title'>생산량</Link>
                <Link to='/market/growth' className='market-title'>생장량</Link>
                <Link to='/market/culture' className='market-title'>배양액</Link>
            </div>
            <div className='row'>
                <Route exact path='/market' component={Output} />
                <Route path='/market/output' component={Output} />
                <Route path='/market/growth' component={Growth} />
                <Route path='/market/culture' component={Culture} />
            </div>
        </div>
    )
}

export default Market;