import React from 'react';

import './DetailPlot.css';

import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

const DetailPlot = ({ inputsForPlot }) => {

    const { data, code, startDate, endDate } = inputsForPlot;

    //1. 특정 센서에 해당하는 데이터만 filtering
    const filterByCode = (rawData, code) => {
        const filteredData = rawData.filter(row => row.fatrCode === code);
        return filteredData;
    }

    //2. 날짜로 filtering
    const filterByDate = (filteredData) => {

        if(startDate!==undefined && endDate===undefined){
            
            //월이나 일이 1자리 수일 경우 앞에 0을 붙여준다.
            let month = String(startDate.getMonth()+1);
            let date = String(startDate.getDate());

            if(String(startDate.getMonth()+1).length === 1){
                month = '0'+String(startDate.getMonth()+1);
            }
            if(String(startDate.getDate()).length === 1){
                date = '0'+String(startDate.getDate());
            }

            const convertedStartDate = String(startDate.getFullYear())+'-'+month+'-'+date;

            const filteredDataByDate = filteredData.filter(row => row.measDate >= convertedStartDate);
            
            if(filteredDataByDate){
                return filteredDataByDate;
            }
        }
        else if(startDate===undefined && endDate!==undefined) {
            
            //월이나 일이 1자리 수일 경우 앞에 0을 붙여준다.
            let month = String(endDate.getMonth()+1);
            let date = String(endDate.getDate());

            if(String(endDate.getMonth()+1).length === 1){
                month = '0'+String(endDate.getMonth()+1);
            }
            if(String(endDate.getDate()).length === 1){
                date = '0'+String(endDate.getDate());
            }

            const convertedEndDate = String(endDate.getFullYear())+'-'+month+'-'+date;
            
            const filteredDataByDate = filteredData.filter(row => row.measDate <= convertedEndDate);
            
            if(filteredDataByDate){
                return filteredDataByDate;
            }
        }
        else if (startDate!==undefined && endDate!==undefined){

            let month1 = String(startDate.getMonth()+1);
            let date1 = String(startDate.getDate());
            let month2 = String(endDate.getMonth()+1);
            let date2 = String(endDate.getDate());

            if(String(startDate.getMonth()+1).length === 1){
                month1 = '0'+String(startDate.getMonth()+1);
            }
            if(String(startDate.getDate()).length === 1){
                date1 = '0'+String(startDate.getDate());
            }
            if(String(endDate.getMonth()+1).length === 1){
                month2 = '0'+String(endDate.getMonth()+1);
            }
            if(String(endDate.getDate()).length === 1){
                date2 = '0'+String(endDate.getDate());
            }

            const convertedStartDate = String(startDate.getFullYear())+'-'+month1+'-'+date1;
            const convertedEndDate = String(endDate.getFullYear())+'-'+month2+'-'+date2;
            // console.log(convertedStartDate, convertedEndDate);
            const filteredDataByDate = filteredData.filter(row => row.measDate >= convertedStartDate && row.measDate <= convertedEndDate);
            
            if(filteredDataByDate){
                return filteredDataByDate;
            }
        }
    }

    //3. filtering된 데이터를 x:measDate, y:senVal 형태로 가공한다.
    const reduce = (filteredData) => {

        var senVal = [];
        var measDate = [];

        for(var i=0;i<filteredData.length;i++){
            senVal.push(filteredData[i]['senVal']);
            measDate.push(filteredData[i]['measDate']);
        }

        const result = {senVal: senVal, measDate: measDate}
        return result;
    }

    const plotGraph = (reducedData) => {
        const config = {
            layout: {
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
            return (
                <Plot className="detail-plot"
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

    if (startDate===undefined && endDate===undefined) return null;
    return (
        <div>
            {plotGraph(reduce(filterByDate(filterByCode(data, code))))}
        </div>
    );
}

export default DetailPlot;