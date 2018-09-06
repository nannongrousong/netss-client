import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './page2.less';

export default class extends Component {
    render() {
        return (
            <div>
                我现在是在page2
                <Link to='/page1' >page1</Link>
                <Link to='/page3' >page3</Link>
            </div>
        );
    }
}