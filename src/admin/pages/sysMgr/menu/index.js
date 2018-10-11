import React, { Component, Fragment } from 'react';
import { Button, Tree, Icon, Modal, Divider } from 'antd';
import { connect } from 'react-redux';
import { listSysMenu, editSysMenu, addSysMenu, delSysMenu } from 'ADMIN_ACTION_SYSMGR/menu';
import { TabWrapper } from 'ADMIN_PAGES_INDEX';
import PropTypes from 'prop-types';
import MenuInfo from './menuInfo';
import { errorHandle } from 'COMMON_UTILS/common';
import styles from 'ADMIN_STYLES/sysMrg-menu.less';

const { TreeNode } = Tree;

const findMenu = (menuID, menus) => {
    for (let menu of menus) {
        if (menu.MenuID == menuID) {
            return menu;
        }

        if (menu.Children) {
            let tempMenu = findMenu(menuID, menu.Children);
            if (tempMenu) {
                return tempMenu;
            }
        }
    }
};
@TabWrapper('sysMenu')
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
            ParentID: 0,
            Title: '后台管理系统',
            Icon: 'tag',
            Type: 'node',
            Path: '/initRoot'
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

    addSubMenu = ({ MenuID: ParentID, Title: ParentTitle }, Type, modalTitle) => {
        this.setState({
            modalTitle,
            showModal: true,
            record: {
                ParentID,
                Type,
                ParentTitle
            }
        });
    }

    delSubMenu = ({ MenuID, Title }) => {
        let delModal = Modal.confirm({
            title: '删除确认',
            content: `您确定要删除[${Title}]吗？`,
            onOk: () => {
                const { delSysMenu } = this.props;
                delSysMenu(MenuID).then(delModal.destroy).catch(errorHandle);
            }
        });
    }

    renderTitle = (item) => {
        const { Title, Path, MenuID, Type, Children } = item;
        return (
            <Fragment>
                <span className='color-cyan'>{Title}</span>
                {Path && Type == 'node' && <span className='ml-16'>{`(链接:${Path})`}</span>}

                {
                    Type == 'node' &&
                    <Fragment>
                        <Divider type='vertical' />
                        <a href='#' className='ml-16' onClick={this.addSubMenu.bind(this, item, 'node', '添加子菜单')}>添加子菜单</a>
                    </Fragment>
                }

                <Divider type='vertical' />
                <a href='#' className='ml-16' onClick={this.editMenu.bind(this, item)}>修改</a>

                {
                    Path && Type == 'node' &&
                    <Fragment>
                        <Divider type='vertical' />

                        <a href='#' className='ml-16' onClick={this.addSubMenu.bind(this, item, 'resource', '添加功能按钮')}>添加功能按钮</a>
                    </Fragment>
                }

                {
                    (!Children || Children.length == 0) &&
                    <Fragment>
                        <Divider type='vertical' />
                        <a href='#' className='ml-16' onClick={this.delSubMenu.bind(this, item)}>删除</a>
                    </Fragment>
                }
            </Fragment>
        );
    };

    renderIcon = (icon) => {
        if(/\.(png|jpe?g|gif|svg)$/.test(icon)) {
            //  图片
            return <img className={styles['icon-pic']} src={icon} />;
        } else {
            //  图标
            return <Icon type={icon} />;
        }
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
            const { Title, MenuID, Icon: IconV, Children, Path } = item;
            if (Children) {
                return (
                    <TreeNode
                        key={MenuID}
                        title={this.renderTitle(item)}
                        icon={this.renderIcon(IconV)} >
                        {this.renderTreeNodes(Children)}
                    </TreeNode>
                );
            }
            return <TreeNode
                key={MenuID}
                title={this.renderTitle(item)}
                icon={this.renderIcon(IconV)} />;
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
            if (dragNodeInfo.ParentID == eventKey) {
                return;
            }

            modifyPart.ParentID = eventKey;
        }

        if (dragOverGapBottom || dragOverGapTop) {
            //  再判断是否是同一个父级
            if (dragNodeInfo.ParentID != targetNodeInfo.ParentID) {
                modifyPart.ParentID = targetNodeInfo.ParentID;
            }

            //  在node下方 优先级降低；在node上方 优先级提升
            modifyPart.Priority = targetNodeInfo.Priority + (dragOverGapBottom ? 1 : -1);
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
        sysMenu: state.sysMenu
    }),
    {
        listSysMenu,
        editSysMenu,
        addSysMenu,
        delSysMenu
    }
)(Index);

export default Index;

