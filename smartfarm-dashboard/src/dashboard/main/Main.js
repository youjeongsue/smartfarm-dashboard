import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Sidebar from '../../layout/Sidebar';
import Header from '../../layout/Header';

import Dashboard from '../dashboard/Dashboard';
import Visualization from '../visualization/Visualization';
import Regression from '../regression/Regression';
import Market from '../market/Market';

import './Main.css';

class Main extends Component {
    render() {
        return (
            <div>
                <div className='sidebar'>
                    <Sidebar />
                </div>
                <div className='contents-wrapper'>
                    <Header />
                    <div className='main-contents'>
                        <Route exact path='/' component={Dashboard}/>
                        <Route path='/visualization' component={Visualization}/>
                        <Route path='/regression' component={Regression}/>
                        <Route path='/market' component={Market} />
                    </div>
                </div>
            </div>
        );
    }
};

export default Main;