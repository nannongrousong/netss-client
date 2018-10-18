import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Divider, Button, Modal } from 'antd';
import PropTypes from 'prop-types';

import { errorHandle } from 'COMMON_UTILS/common';
import { addSysRole, delSysRole, editSysRole } from 'NETSS_ACTION_SYSMGR/role';
import { listSysMenu } from 'NETSS_ACTION_SYSMGR/menu';

import RoleInfo from './roleInfo';
import MenuAuth from './menuAuth';

class RoleTable extends Component {
    state = {
        isShowInfoModal: false,
        isShowMenuModal: false,
        record: null,
        roleID: null
    }

    configAuth = (roleID) => {
        this.setState({
            isShowMenuModal: true,
            roleID
        });
    }

    closeModal = (type) => {
        this.setState({
            [{ info: 'isShowInfoModal', menu: 'isShowMenuModal' }[type]]: false,
            record: null,
            roleID: null
        });
    }

    handleRoleOper = (record, e) => {
        if (!e) {
            e = record;
        }

        const { oper } = e.target.dataset;

        switch (oper) {
            case 'add':
                this.setState({
                    isShowInfoModal: true
                });
                break;
            case 'edit':
                this.setState({
                    isShowInfoModal: true,
                    record
                });
                break;
            case 'del':
                 Modal.confirm({
                    title: '信息',
                    content: '确认要删除当前角色吗？角色删除后，绑定该角色的用户所有权限都会丢失',
                    onOk: () => {
                        const { delSysRole } = this.props;
                        const { RoleID } = record;
                        delSysRole(RoleID)
                            .then()
                            .catch(errorHandle);
                    }
                });
                break;
            default:
                break;
        }
    }

    render() {
        const { sysRole, addSysRole, editSysRole, sysMenu, listSysMenu } = this.props;
        const { isShowInfoModal, isShowMenuModal, record, roleID } = this.state;

        const columns = [{
            title: '角色名',
            dataIndex: 'RoleName'
        }, {
            title: '备注',
            dataIndex: 'Remark'
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span onClick={this.handleRoleOper.bind(this, record)}>
                    <a href='#' data-oper='edit'>修改</a>
                    <Divider type='vertical' />
                    <a href='#' data-oper='del'>删除</a>
                    <Divider type='vertical' />
                    <a href='#' onClick={this.configAuth.bind(this, record.RoleID)}>配置权限</a>
                </span>
            )
        }];

        return (
            <Fragment>
                <Table
                    rowKey='RoleID'
                    title={() => (<Button data-oper='add' className='mb-8' type='primary' onClick={this.handleRoleOper}>添加角色</Button>)}
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

RoleTable = connect(
    (state) => ({
        sysRole: state.sysRole,
        sysMenu: state.sysMenu
    }),
    {
        addSysRole,
        delSysRole,
        editSysRole,
        listSysMenu
    }
)(RoleTable);

export default RoleTable;