import React, { Component } from 'react';
import 'STYLES/comp2.css';
import { Link } from 'react-router-dom';
import jquery from 'jquery';
import sum from 'UTILS/sum';

export default class extends Component {
    render() {
        return (
            <div>
                div长度: {jquery('body').length}，测试和{sum(1,2)}
                <Link to='/comp1' >comp1</Link>
                <Link to='/comp3' >comp3</Link>
            </div>
        );
    }
}