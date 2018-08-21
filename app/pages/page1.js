import React, { Component } from 'react';
import AliyunUpload from 'COMPONENT/AliyunUpload';

import 'STYLES/page1.css';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { pageAGetData } from 'SERVICE/pageA';

export default class extends Component {
    handleClick = () => {
        pageAGetData({
            a: 1,
            b: 2
        }, true);
    }

    render() {
        return (
            <div>

                <Link to='/page2' >page2</Link>
                <Link to='/page3' >page3</Link>

                <Button onClick={this.handleClick}>点击</Button>

                <AliyunUpload />
            </div>
        );
    }
}