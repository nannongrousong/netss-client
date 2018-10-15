import React, { Component } from 'react';
import { Modal, Tree, Icon } from 'antd';
import PropTypes from 'prop-types';
import { errorHandle } from 'COMMON_UTILS/common';
import { Save_Role_Menus, List_Role_Menus } from 'ADMIN_SERVICE/Sys_Mgr';
const { TreeNode } = Tree;
import createTreeNode from 'COMMON_UTILS/createTreeNode';

class MenuAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: []
        };
    }

    componentDidMount() {
        const { sysMenu, listSysMenu, roleID } = this.props;
        (!sysMenu || sysMenu.length == 0) && listSysMenu();

        List_Role_Menus({ roleID }).then((resData) => {
            this.setState({
                checked: resData.Data
            });
        }).catch(err => {
            errorHandle(err);
        });
    }

    closeModal = () => {
        let { closeModal } = this.props;
        closeModal('menu');
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

    saveUserMenus = () => {
        const { roleID } = this.props;
        const { checked } = this.state;

        Save_Role_Menus({
            roleID,
            menuIDs: checked
        }).then(this.closeModal).catch(errorHandle);

    }

    handleTreeCheck = (checkedKeys, e) => {
        const { checked } = checkedKeys;
        this.setState({ checked });
    }

    render() {
        const { sysMenu } = this.props;
        const { checked } = this.state;

        return (
            <Modal
                visible={true}
                onCancel={this.closeModal}
                onOk={this.saveUserMenus}>
                {
                    sysMenu && sysMenu.length > 0 &&
                    <Tree
                        defaultExpandAll
                        showLine
                        checkable
                        checkStrictly
                        checkedKeys={checked}
                        onCheck={this.handleTreeCheck}>
                        {this.renderTreeNodes(createTreeNode(sysMenu))}
                    </Tree>
                }

            </Modal>
        );
    }
}

MenuAuth.propTypes = {
    sysMenu: PropTypes.array,
    listSysMenu: PropTypes.func,
    closeModal: PropTypes.func,
    roleID: PropTypes.number.isRequired
};

export default MenuAuth;