import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Spinner from 'react-bootstrap/Spinner';
import './Dashboard.css';

import SimpleBox from './plots/SimpleBox';
import EnvPlots from './EnvPlots';
import HourOutput from './plots/HourOutput';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
      let interval = setInterval(() => {
        axios.get('http://localhost:8000/env').then((payload) => {
          setData(payload.data);
        }).catch((e) => {
          console.log(e);
        })
      }, 1000);
      
      return() => clearInterval(interval);
  }, []);

  if (!data) return (
    <Spinner animation="border" role="status" />
  )
  return (
    <div className='container-fluid dashboard-wrapper'>
      <div className='row'>
        <HourOutput data={data}/>
      </div>
      <div className='row'>
        <SimpleBox data={data} />
      </div>
      <div className='row'>
        <EnvPlots data={data} />
      </div>
    </div>
  )
}

export default Dashboard;