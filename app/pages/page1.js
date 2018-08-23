import React, { Component } from 'react';
import AliyunUpload from 'COMPONENT/AliyunUpload';

import 'STYLES/page1.less';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { serviceAPostData, serviceAGetData } from 'SERVICE/SERVICE_A';
import { serviceBPostData, serviceBGetData } from 'SERVICE/SERVICE_B';

export default class extends Component {
    handleClick1 = () => {
        serviceAPostData({
            a: 1,
            b: 2
        }, true);
    }

    handleClick2 = () => {
        serviceAGetData({
            a: 1,
            b: 2
        }, true);
    }

    handleClick3 = () => {
        serviceBPostData({
            a: 1,
            b: 2
        }, true);
    }

    handleClick4 = () => {
        serviceBGetData({
            a: 1,
            b: 2
        }, true);
    }

    handleClick5 = () => {
        fetch('/api/VCodeManager/GetVCode', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                AppVer: '1.0.0',
                TimeStamp: 1534940670,
                Lang: 'CN',
                DeviceType: 'web', 
                Token: '',
                Uid: 0, 
                AppKey: 'ZXXWeb', 
                Sign: 'd577bb6690944892c19032af313a7656', 
                Data: '{SPhone: "18000000000"}'
            })
        });
    }

    render() {
        return (
            <div>
                <Link to='/page2' >pagessss2</Link>
                <Link to='/page3' >page3</Link>
                <Button onClick={this.handleClick1}>服务A POST</Button>
                <Button onClick={this.handleClick2}>服务A GET</Button>
                <Button onClick={this.handleClick3}>服务B POST</Button>
                <Button onClick={this.handleClick4}>服务B GET</Button>
                <Button onClick={this.handleClick5}>ZXX VCODE</Button>
                <AliyunUpload />
            </div>
        );
    }
}