import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Spinner from 'react-bootstrap/Spinner';
import './HourOutput.css';

import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

const HourOutput = ({ data }) => {
    const [predict, setPredict] = useState(null);

    useEffect(() => {    
        let interval = setInterval(() => {
            axios.get('http://localhost:8000/predict').then((payload) => {
                setPredict(payload.data);
            }).catch((e) => {
                console.log(e);
            })
        }, 1000);
        return() => clearInterval(interval);
    }, [])

    const reduce = (filteredData) => {
        var fruitsNum = [];
        var fruitsNumPredict = [];
        var weeks = [];
        var onlyEnv = [];

        for(var i=0;i<filteredData.length;i++){
            fruitsNum.push(filteredData[i]['fruitsNum']);
            fruitsNumPredict.push(filteredData[i]['fruitsNumPredict']);
            weeks.push(filteredData[i]['weeks'].split(', ')[1].replace(')', '')+'주차');
            onlyEnv.push(filteredData[i]['onlyEnv']);
        }

        const result = {fruitsNum: fruitsNum, weeks: weeks,fruitsNumPredict: fruitsNumPredict, onlyEnv: onlyEnv}
        return result;
    }

    const plotGraph = (reducedData) => {
        const config = {
            layout: {
                width: 440, height: 170,
                margin: {
                    l:20, r:0, t:10, b:20
                },
                font: {
                    size: 10
                },
                showlegend: false
            },
            config: {
                displayModeBar: false
            }
        }

        if(reducedData) {
            return (
                <Plot className='plot'
                    data={[
                        {
                            x: reducedData['weeks'],
                            y: reducedData['fruitsNum'],
                            name: '이번 주 생산량',
                            type: 'bar'
                        },
                        {
                            x: reducedData['weeks'],
                            y: reducedData['fruitsNumPredict'],
                            name: '예측 생산량',
                            type: 'line'
                        }
                    ]}
                    layout={config.layout}
                    graphDiv='graph'
                    config={config.config}
                />
            )
        }
    }

    const plotFeature = () => {
        const config = {
            layout: {
                width: 250, height: 130,
                margin: {
                    l:20, r:0, t:0, b:0
                },
                font: {
                    size: 10
                },
                // showlegend: false
            },
            config: {
                displayModeBar: false
            }
        }

        return (
            <Plot className='plot'
                data={[
                    {
                        values: [21, 16, 11, 10, 10, 8, 7, 17],
                        labels: ['TL', 'CI', 'EL', 'WD', 'TI', 'WS', 'TE', 'etc'],
                        type: 'pie',
                        marker: {
                            colors: ['#B22222', '#FF0000', '#DC143C', '#CD5C5C', '#F08080', '#E9967A', '#FFA07A', '#FA8072']
                        }
                    }
                ]}
                layout={config.layout}
                graphDiv='graph'
                config={config.config}
            />
        )
    }

    const nowOutput = (reducedData) => {
        if(reducedData) {
            return (
                <div className='hour-output-now'>
                    <div>
                        <p>이번 주 예측 생산량</p>
                        <p className='output-predict'>{reducedData['fruitsNumPredict'][reducedData['fruitsNumPredict'].length-1].toFixed(2)}</p>
                    </div>
                    <div>
                        <p>현재 상태를 유지하세요</p>
                    </div>
                </div>
            )
        }
    }

    if(!predict) return (
        <Spinner animation="border" role="status" />
    )
    return (
        <div className='container hour-output-wrapper'>
            <div className='row'>
                <div className='col hour-output-now hour-box'>
                    {nowOutput(reduce(predict))}
                </div>
                <div className='col-sm-5 hour-output-graph hour-box'>
                    <div>
                        {plotGraph(reduce(predict))}
                    </div>
                </div>
                <div className='col feature-importance hour-box'>
                    <p>변수 중요도</p>
                    <div>{plotFeature()}</div>
                </div>
            </div>
        </div>
    )
}

export default HourOutput;