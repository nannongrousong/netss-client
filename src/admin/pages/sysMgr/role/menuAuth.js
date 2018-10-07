import React, { Component } from 'react';
import { Modal, Tree, Icon } from 'antd';
import PropTypes from 'prop-types';

const { TreeNode } = Tree;

class MenuAuth extends Component {
    componentDidMount() {
        const { sysMenu, listSysMenu } = this.props;
        (!sysMenu || sysMenu.length == 0) && listSysMenu();
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
            const { Title, MenuID, Icon: IconV, Children, Path } = item;
            if (Children) {
                return (
                    <TreeNode
                        key={MenuID}
                        title={Title}
                        icon={<Icon type={IconV} />} >
                        {this.renderTreeNodes(Children)}
                    </TreeNode>
                );
            }
            return <TreeNode
                key={MenuID}
                title={Title}
                icon={<Icon type={IconV} />} />;
        });
    }

    render() {
        let { closeModal, sysMenu } = this.props;
        closeModal = closeModal.bind(this, 'menu');
        return (
            <Modal
                visible={true}
                onCancel={closeModal}>
                {
                    sysMenu && sysMenu.length > 0 &&
                    <Tree
                        defaultExpandAll
                        showLine
                        checkable>
                        {this.renderTreeNodes(sysMenu)}
                    </Tree>
                }

            </Modal>
        );
    }
}

MenuAuth.propTypes = {
    sysMenu: PropTypes.array,
    listSysMenu: PropTypes.func,
    closeModal: PropTypes.func
};

export default MenuAuth;