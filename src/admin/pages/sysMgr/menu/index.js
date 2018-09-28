import React, { Component, Fragment } from 'react';
import { Button, Tree, Icon, Modal, message } from 'antd';
import { connect } from 'react-redux';
import { listSysMenu, editSysMenu, addSysMenu, delSysMenu } from 'ADMIN_ACTION/sysMgr';
import { TabWrapper } from 'ADMIN_PAGES_INDEX';
import PropTypes from 'prop-types';
import MenuInfo from './menuInfo';

const { TreeNode } = Tree;

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
            type: 'leaf',
            path: '/initRoot'
        }).then()
            .catch(err => {
                console.log(err);
                message.error(err.message);
            });
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
                delSysMenu(menu_id).then(delModal.destroy).catch(err => {
                    message.error(err.message);
                    console.log(err);
                });
            }
        });
    }

    renderTitle = (item) => {
        const { title, path, menu_id, type, children } = item;
        return (
            <Fragment>
                <span className='color-cyan'>{title}</span>
                {path && <span className='ml-16'>{`(链接:${path})`}</span>}

                <Fragment>
                    <span className='ml-16'>|</span>
                    <a href='#' className='ml-16' onClick={this.addSubMenu.bind(this, item, 'leaf', '添加子菜单')}>添加子菜单</a>
                </Fragment>

                <span className='ml-16'>|</span>
                <a href='#' className='ml-16' onClick={this.editMenu.bind(this, item)}>修改</a>

                {
                    type == 'leaf' &&
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

    handleDragStart = ({ event, node }) => {
        //console.log('event', event);
        //console.log('node', node);
    }

    handleDragOver = ({event, node}) => {
        console.log('handleDragOver.node', node.props);
    }

    handleOnDrop = ({ event, node, dragNode, dragNodesKeys }) => {
        //console.log('event1111111111111', event);
        //console.log('node2222222222', node);
        //console.log('dragNode22333333333333333', dragNode);
        console.log('dragNodesKeys44444444444444', dragNodesKeys);
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
                        onDragOver={this.handleDragOver}
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

