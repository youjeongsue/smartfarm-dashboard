import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';

import './Visualization.css';

import DetailVis from './detail/DetailVis';
import CompareVis from './compare/CompareVis';

const Visualization = ({ location }) => {

    // if (location.state) return (
    //     <div>{location.state.code}</div>
    // )
    return (
        <div className='container'>
            <div className='row'>
                <Link to='/visualization'><p className='vis-title'>상세보기</p></Link>
                <Link to='/visualization/compare'><p className='vis-title'>다른 농가와 비교</p></Link>
            </div>
            <div className='row'>
                <Route exact path='/visualization' component={DetailVis} />
                <Route path='/visualization/compare' component={CompareVis} />
            </div>
        </div>
    ) 
}

export default Visualization;