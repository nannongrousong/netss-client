import React, { Component } from 'react';
import 'APP_STYLES/page3.css';
import { Link } from 'react-router-dom';

export default class extends Component {
    render() {
        return (
            <div>
                <Link to='/page1' >page1</Link>
                <Link to='/page2' >page2</Link>
            </div>
        );
    }
}