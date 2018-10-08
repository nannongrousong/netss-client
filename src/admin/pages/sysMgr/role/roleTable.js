import React, { Component, Fragment } from 'react';
import { Table, Divider, Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import { errorHandle } from 'COMMON_UTILS/common';

import RoleInfo from './roleInfo';
import MenuAuth from './menuAuth';

class RoleTable extends Component {
    state = {
        isShowInfoModal: false,
        isShowMenuModal: false,
        record: null,
        roleID: null
    }

    startEdit = (record) => {
        this.setState({
            isShowInfoModal: true,
            record
        });
    }

    startAdd = () => {
        this.setState({
            isShowInfoModal: true
        });
    }

    startDel = (roleID) => {
        const { delSysRole } = this.props;
        let tempDialog = Modal.confirm({
            title: '信息',
            content: '确认要删除当前角色吗？',
            onOk: () => {
                delSysRole(roleID)
                    .then(tempDialog.destroy)
                    .catch(errorHandle);
            }
        });
    }

    configAuth = (roleID) => {
        this.setState({
            isShowMenuModal: true,
            roleID
        });
    }

    closeModal = (type) => {
        this.setState({
            [{ info: 'isShowInfoModal', menu: 'isShowMenuModal' }[type]]: false
        });
    }

    render() {
        const { sysRole, addSysRole, editSysRole, sysMenu, listSysMenu } = this.props;
        const { isShowInfoModal, isShowMenuModal, record, roleID } = this.state;

        const columns = [{
            title: '角色名',
            dataIndex: 'RoleName',
            render: (text, record) => <a href='#' onClick={this.startEdit.bind(this, record)}>{text}</a>
        }, {
            title: '备注',
            dataIndex: 'Remark'
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href='#' onClick={this.startEdit.bind(this, record)}>修改</a>
                    <Divider type='vertical' />
                    <a href='#' onClick={this.startDel.bind(this, record.RoleID)}>删除</a>
                    <Divider type='vertical' />
                    <a href='#' onClick={this.configAuth.bind(this, record.RoleID)}>配置权限</a>
                </span>
            )
        }];

        return (
            <Fragment>
                <Table
                    rowKey='RoleID'
                    title={() => (<Button className='mb-8' type='primary' onClick={this.startAdd}>添加角色</Button>)}
                    dataSource={sysRole}
                    columns={columns}>

                </Table>
                {
                    isShowInfoModal &&
                    <RoleInfo
                        {...{
                            addSysRole,
                            editSysRole,
                            record
                        }}
                        closeModal={this.closeModal} />
                }

                {
                    isShowMenuModal &&
                    <MenuAuth
                        {...{
                            sysMenu,
                            listSysMenu,
                            roleID
                        }}
                        closeModal={this.closeModal} />
                }
            </Fragment>

        );
    }
}

RoleTable.propTypes = {
    sysRole: PropTypes.array,
    addSysRole: PropTypes.func,
    editSysRole: PropTypes.func,
    delSysRole: PropTypes.func
};

export default RoleTable;