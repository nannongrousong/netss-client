import React, { Component } from 'react';
import styles from './index.less';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const exceptionMap = {
    '403': {
        img: 'https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg',
        title: '403',
        desc: '抱歉，你无权访问该页面'
    },
    '404': {
        img: 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg',
        title: '404',
        desc: '抱歉，你访问的页面不存在'
    },
    '500': {
        img: 'https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg',
        title: '500',
        desc: '抱歉，服务器出错了'
    }
};

class Exception extends Component {
    backHome = () => {
        const { homePath } = this.props;
        window.location.pathname = homePath;
    }

    render() {
        const { type } = this.props;
        const { img, title, desc } = exceptionMap[type];
        return (
            <div className={styles.wrapper }>
                <img src={img} />
                <div className='ml-32'>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.desc}>{desc}</p>
                    <Button type='primary' onClick={this.backHome}>返回首页</Button>
                </div>
            </div>
        );
    }
}

Exception.propTypes = {
    history: PropTypes.object,
    homePath: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

export default Exception;