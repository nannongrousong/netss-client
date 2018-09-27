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

    handleSave = () => {

    }

    editMenu = (item) => {
        this.setState({
            showModal: true,
            record: {
                ...item,
                parentTitle: item.parent_title
            },
            modalTitle: '修改',
        });
    }

    addSubMenu = ({ menu_id: parentID, title: parentTitle }, type, modalTitle) => {
        this.setState({
            modalTitle,
            showModal: true,
            record: {
                parentID,
                type,
                parentTitle
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
                {type == 'leaf' && <span className='ml-16'>{`(链接:${path})`}</span>}

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

    render() {
        const { sysMenu, editSysMenu, addSysMenu } = this.props;
        const { showModal, record, modalTitle } = this.state;

        return (
            <div>
                <Button type='primary' onClick={this.handleSave}>保存</Button>
                {
                    sysMenu && sysMenu.length > 0 && <Tree
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

