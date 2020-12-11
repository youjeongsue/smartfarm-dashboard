import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

import { csv } from 'd3';
import meanFile from '../../../shared/data/env_mean.csv';

import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

const row = d => {
    d.senVal = +d.senVal;
    return d;
};

const SinglePlot = ({ data, code }) => {
    const [mean, setMean] = useState([]);

    useEffect(() => {
        csv(meanFile, row).then(setMean);
    }, [mean]);

    //1. 특정 센서에 해당하는 데이터만 filtering
    const filterByCode = (rawData, code) => {
        const filteredData = rawData.filter(row => row.fatrCode === code);
        return filteredData;
    }

    //2. filtering된 데이터를 x:measDate, y:senVal 형태로 가공한다.
    const reduce = (filteredData) => {

        var senVal = [];
        var mean_senVal = [];
        var measDate = [];

        for(var i=0;i<filteredData.length;i++){
            senVal.push(filteredData[i]['senVal']);
            // mean_senVal.push(filteredMeanData[i]['senVal']);
            measDate.push(filteredData[i]['measDate']);
        }

        const result = {senVal: senVal, measDate: measDate}
        return result;
    }

    //3. 날짜로 filtering
    const filterByDate = (filteredData) => {
        // console.log(filteredData.length);
        // console.log(filteredMeanData.length);
        let startDate = format(new Date(new Date(filteredData[filteredData.length-1].measDate) - 86400000), 'yyyy-MM-dd HH:mm:ss');

        const filteredDataByDate = filteredData.filter(row => row.measDate >= startDate && row.measDate <= filteredData[filteredData.length-1].measDate);
        
        return filteredDataByDate;
    }

    const plotGraph = (reducedData) => {
        const config = {
            layout: {
                width: 500, height: 180,
                margin: {
                    l:30, r:30, t:10, b:30
                },
                font: {
                    size: 10
                }
            },
            config: {
                displayModeBar: false
            }
        }

        if(reducedData){
            // console.log(reducedMeanData);
            return (
                <Plot className="plot"
                    data={[
                        {
                            y: reducedData['senVal'],
                            x: reducedData['measDate'],
                            type: 'scatter',
                            mode: 'lines+markers'
                        }
                    ]}
                    layout={config.layout}
                    revision={data.revision}
                    graphDiv="graph"
                    config={config.config}
                />
        )}
    }

    if (!data) return null;
    return (
        <div>
            {/* {console.log(filterByCode(mean, code))} */}
            {plotGraph(reduce(filterByDate(filterByCode(data, code))))}
        </div>
    );
}

export default SinglePlot;