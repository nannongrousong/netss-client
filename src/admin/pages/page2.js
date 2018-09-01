import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'ADMIN_STYLES/page2.less';

export default class extends Component {
    render() {
        return (
            <div>
                <Link to='/page1' >page1</Link>
                <Link to='/page3' >page3</Link>
            </div>
        );
    }
}