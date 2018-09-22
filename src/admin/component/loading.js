import React, { Component } from 'react';
import { Spin } from 'antd';

export default class extends Component {
    render() {
        console.log('loading.this.props', this.props);
        return (
            <div style={{ height: '800px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <Spin size='large' tip='页面正在加载中，请稍后。'></Spin>
            </div>
        );
    }
}