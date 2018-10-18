import React, { Component } from 'react';
import { Icon, Modal, message } from 'antd';
import PropTypes from 'prop-types';

import ReacIcon from 'NETSS_CONFIG/reactIcon';
import styles from 'NETSS_STYLES/sysMrg-menu.less';

class IconList extends Component {
    state = {
        selectedIcon: ''
    }

    handleOK = () => {
        const { selectedIcon } = this.state;
        const { endChooseIcon } = this.props;
        if(!selectedIcon) {
            message.info('请选择图标！');
            return;
        }
        endChooseIcon(selectedIcon);
    }

    //  此处的click事件为每个ICON绑定了一次。你可能考虑到冒泡、捕获事件，直接在节点[modal-icon-content]上注册一次click事件即可。
    //  但此处比较特殊。由于Icon使用的是svg，发生click事件时，无法判断target的类型，是svg、还是svg中的path？
    handleIconClick = (icon) => {
        this.setState({
            selectedIcon: icon
        });
    }

    render() {
        const { closeModal } = this.props;
        const { selectedIcon } = this.state;

        return (
            <Modal
                title='选择图标'
                visible
                onCancel={closeModal}
                onOk={this.handleOK}>
                <div className={styles['modal-icon-content']} >
                    {
                        ReacIcon.map(({ title, list }, index) => (
                            <div key={index} className='mb-24'>
                                <h3>{title}</h3>
                                <div className={styles['modal-icon-list']}>
                                    {
                                        list.map((icon, index) => (
                                            <div key={index} className={styles['modal-icon-wrapper']} onClick={this.handleIconClick.bind(this, icon)}>
                                                <Icon type={icon} className={styles['modal-icon-item'] + ' ' + (selectedIcon == icon ? styles['modal-icon-selected'] : '')} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Modal>
        );
    }
}

IconList.propTypes = {
    closeModal: PropTypes.func.isRequired,
    endChooseIcon: PropTypes.func.isRequired
};

export default IconList;