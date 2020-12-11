import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Sidebar.css';
import home from '../shared/images/home.png';
import find from '../shared/images/find.png';
import chart from '../shared/images/chart.png';
import market from '../shared/images/market.png';

class Sidebar extends Component {
    render() {
        return (
            <div className='container sidebar-wrapper'>
                <div className='row sidebar-logo'>Flour.</div>
                <Link to='/'><div className='row sidebar-item'>
                    <img className='sidebar-icon' src={home} alt="dashboard" />
                    대시보드
                </div></Link>
                <Link to='/visualization'><div className='row sidebar-item'>
                    <img className='sidebar-icon' src={chart} alt="visualization" />
                    분석 리포트
                </div></Link>
                {/* <Link to='/regression'><div className='row sidebar-item'>
                    <img className='sidebar-icon' src={find} alt="regression" />
                    AI 예측
                </div></Link>
                <Link to='/market'><div className='row sidebar-item'>
                    <img className='sidebar-icon' src={market} alt="market" />
                    마켓
                </div></Link>
                <a href="http://192.168.1.17:5000/loginApi/login"><div className='row sidebar-item'>
                    <img className='sidebar-icon' src={market} alt="market" />
                    로그인
                </div></a> */}
            </div>
        )
    }
}

export default Sidebar;