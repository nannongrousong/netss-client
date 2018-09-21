import React, { Component } from 'react';
import { Exception as AliException } from 'ant-design-pro/lib';

class Exception extends Component {
    render() {
        return (
            <AliException type='404' />
        );
    }
}

export default Exception;