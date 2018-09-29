import React, { Component, Fragment } from 'react';
import { Button, Tree, Icon, Modal, message } from 'antd';
import { connect } from 'react-redux';
import { listSysMenu, editSysMenu, addSysMenu, delSysMenu } from 'ADMIN_ACTION/sysMgr';
import { TabWrapper } from 'ADMIN_PAGES_INDEX';
import PropTypes from 'prop-types';
import MenuInfo from './menuInfo';
import { errorHandle } from 'COMMON_UTILS/common';

const { TreeNode } = Tree;

const findMenu = (menuID, menus) => {
    for (let menu of menus) {
        if (menu.menu_id == menuID) {
            return menu;
        }

        if (menu.children) {
            let tempMenu = findMenu(menuID, menu.children);
            if (tempMenu) {
                return tempMenu;
            }
        }
    }
};
@TabWrapper('sysMgr')
class Index extends Component {
    state = {
        showModal: false,
        record: null,
        modalTitle: ''
    }

    componentDidMount() {
        const { listSysMenu, tabFirstIn } = this.props;
        tabFirstIn && listSysMenu();
    }

    initSysMenu = () => {
        const { addSysMenu } = this.props;
        addSysMenu({
            parent_id: 0,
            title: '后台管理系统',
            icon: 'tag',
            type: 'node',
            path: '/initRoot'
        }).then()
            .catch(errorHandle);
    }

    editMenu = (record) => {
        this.setState({
            showModal: true,
            record,
            modalTitle: '修改',
        });
    }

    addSubMenu = ({ menu_id: parent_id, title: parent_title }, type, modalTitle) => {
        this.setState({
            modalTitle,
            showModal: true,
            record: {
                parent_id,
                type,
                parent_title
            }
        });
    }

    delSubMenu = ({ menu_id, title }) => {
        let delModal = Modal.confirm({
            title: '删除确认',
            content: `您确定要删除[${title}]吗？`,
            onOk: () => {
                const { delSysMenu } = this.props;
                delSysMenu(menu_id).then(delModal.destroy).catch(errorHandle);
            }
        });
    }

    renderTitle = (item) => {
        const { title, path, menu_id, type, children } = item;
        return (
            <Fragment>
                <span className='color-cyan'>{title}</span>
                {path && type == 'node' && <span className='ml-16'>{`(链接:${path})`}</span>}

                {
                    type == 'node' &&
                    <Fragment>
                        <span className='ml-16'>|</span>
                        <a href='#' className='ml-16' onClick={this.addSubMenu.bind(this, item, 'node', '添加子菜单')}>添加子菜单</a>
                    </Fragment>
                }

                <span className='ml-16'>|</span>
                <a href='#' className='ml-16' onClick={this.editMenu.bind(this, item)}>修改</a>

                {
                    path && type == 'node' &&
                    <Fragment>
                        <span className='ml-16'>|</span>
                        <a href='#' className='ml-16' onClick={this.addSubMenu.bind(this, item, 'resource', '添加功能按钮')}>添加功能按钮</a>
                    </Fragment>
                }

                {
                    (!children || children.length == 0) &&
                    <Fragment>
                        <span className='ml-16'>|</span>
                        <a href='#' className='ml-16' onClick={this.delSubMenu.bind(this, item)}>删除</a>
                    </Fragment>
                }
            </Fragment>
        );
    };

    renderTreeNodes = (data) => {
        return data.map((item) => {
            const { title, menu_id, icon, children, path } = item;
            if (item.children) {
                return (
                    <TreeNode
                        key={menu_id}
                        title={this.renderTitle(item)}
                        icon={<Icon type={icon} />} >
                        {this.renderTreeNodes(children)}
                    </TreeNode>
                );
            }
            return <TreeNode
                key={menu_id}
                title={this.renderTitle(item)}
                icon={<Icon type={icon} />} />;
        });
    }

    closeModal = () => {
        this.setState({
            showModal: false,
            record: null
        });
    }

    handleOnDrop = ({ node, dragNode, dragNodesKeys }) => {
        const { editSysMenu, sysMenu } = this.props;

        //  目标节点参数
        const { dragOver, dragOverGapBottom, dragOverGapTop, eventKey } = node.props;
        const [dragNodeKey] = dragNodesKeys;
        let dragNodeInfo = findMenu(dragNodeKey, sysMenu);
        let targetNodeInfo = findMenu(eventKey, sysMenu);

        let modifyPart = {};

        if (dragOver) {
            //  drageNode成为node子元素
            //  判断新老parent_id是否相同，相同的话可不拖动
            if (dragNodeInfo.parent_id == eventKey) {
                return;
            }

            modifyPart.parent_id = eventKey;
        }

        if (dragOverGapBottom || dragOverGapTop) {
            //  再判断是否是同一个父级
            if (dragNodeInfo.parent_id != targetNodeInfo.parent_id) {
                modifyPart.parent_id = targetNodeInfo.parent_id;
            }

            //  在node下方 优先级降低；在node上方 优先级提升
            modifyPart.priority = targetNodeInfo.priority + (dragOverGapBottom ? 1 : -1);
        }

        editSysMenu({
            ...dragNodeInfo,
            ...modifyPart
        }).then().catch(errorHandle);
    }

    render() {
        const { sysMenu, editSysMenu, addSysMenu } = this.props;
        const { showModal, record, modalTitle } = this.state;

        return (
            <div>
                {
                    (!sysMenu || sysMenu && sysMenu.length == 0) &&
                    <Button type='primary' onClick={this.initSysMenu}>初始化根节点</Button>
                }

                {
                    sysMenu && sysMenu.length > 0 &&
                    <Tree
                        draggable
                        onDragStart={this.handleDragStart}
                        onDrop={this.handleOnDrop}
                        defaultExpandAll
                        showLine
                        showIcon >
                        {this.renderTreeNodes(sysMenu)}
                    </Tree>
                }

                {
                    showModal && <MenuInfo
                        modalTitle={modalTitle}
                        record={record}
                        closeModal={this.closeModal}
                        editSysMenu={editSysMenu}
                        addSysMenu={addSysMenu} />
                }
            </div>
        );
    }
}

Index.propTypes = {
    sysMenu: PropTypes.array,
    listSysMenu: PropTypes.func,
    editSysMenu: PropTypes.func,
    addSysMenu: PropTypes.func,
    delSysMenu: PropTypes.func,
    tabFirstIn: PropTypes.bool
};


Index = connect(
    (state) => ({
        sysMenu: state.sysMgr.menu
    }),
    {
        listSysMenu,
        editSysMenu,
        addSysMenu,
        delSysMenu
    }
)(Index);

export default Index;

