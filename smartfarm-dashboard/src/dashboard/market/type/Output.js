import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const Output = () => {
    const [loading, setLoading] = useState();
    const [inputs, setInputs] = useState({});
    const [modelList, setModelList] = useState();

    const onInputsChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const config = {
        headers: {"Access-Control-Allow-Origin": "*"}
    }

    useEffect(() => {
        axios.get("http://192.168.1.17:5000/marketApi/").then(({ data }) => {
            setModelList(data);
            let temp = {};
            for(let i=0;i<data.length;i++){
                temp[data[i].id] = 0
            }
            setInputs(temp);
            setLoading(true);
        }).catch(e => {
            console.error(e);
            setLoading(false);
        })
    }, []);

    const onChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: parseInt(e.target.value)
        })
    }

    const onClick = () => {
        const modelid = (id) => {
            return (
                { 'userid' : 'wjdtn1912', 'modelId' : parseInt(id) }
            )
        }
        console.log(inputs)
        for(let key in inputs){
            if(inputs[key]!==0){
                axios.post('http://192.168.1.17:5000/marketApi/', modelid(key), config).then(({ data }) => {
                    console.log(data)
                }).catch(e => {
                    console.error(e);
                })
            }
        }
    }

    if(!modelList) return null;
    return (
        <div className='container'>
            <div className='row model-list-wrapper shadow'>
                <div className='model-list-title'>생산량 모델 마켓</div>
                <Table>
                    <thead className='model-list-head'>
                        <tr>
                            <th>이름</th>
                            <th>설명</th>
                            <th>버전</th>
                            <th>가격</th>
                            <th>개월</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modelList.filter(model => model.category === "생산량").map(model => {
                            return (
                                <tr key={model.id}>
                                    <td>{model.modelname}</td>
                                    <td>{model.content}</td>
                                    <td>{model.version}</td>
                                    <td>{model.price}</td>
                                    <td><input type='number' name={model.id} min={0} onChange={onChange}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
            <div className='row float-right'>
                <Button variant='dark' size='sm' className='market-button' onClick={onClick}>구매</Button>
                <a href="http://192.168.1.17:5000/modelApi/register/model"><Button variant='dark' size='sm' className='market-button'>모델 등록</Button></a>
            </div>
        </div>
    )
}

export default Output;