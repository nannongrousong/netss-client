import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Divider, Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import UserInfo from './userInfo';
import { errorHandle } from 'COMMON_UTILS/common';

import { addSysUser, delSysUser, editSysUser } from 'ADMIN_ACTION_SYSMGR/user';
import { listSysRole } from 'ADMIN_ACTION_SYSMGR/role';

class UserTable extends Component {
    state = {
        isShowModal: false,
        record: null
    }

    startEditUser = (record) => {

    }

    closeModal = () => {
        this.setState({
            isShowModal: false,
            record: null
        });
    }

    handleUserOper = (record, e) => {
        if (!e) {
            e = record;
        }

        const { oper } = e.target.dataset;

        switch (oper) {
            case 'add':
                this.setState({
                    isShowModal: true,
                    record: null
                });
                break;
            case 'del':
                Modal.confirm({
                    title: '删除确认',
                    content: `您确定要删除[${record.LoginName}]吗？`,
                    onOk: () => {
                        const { delSysUser } = this.props;
                        const { UserID } = record;
                        delSysUser(UserID)
                            .then()
                            .catch(errorHandle);
                    }
                });
                break;
            case 'edit':
                this.setState({
                    isShowModal: true,
                    record
                });
                break;
            default:
                break;
        }

    }

    render() {
        const { sysUser: { data }, addSysUser, editSysUser, sysRole, listSysRole } = this.props;
        const { isShowModal, record } = this.state;

        const columns = [{
            title: '登录名',
            dataIndex: 'LoginName'
        }, {
            title: '昵称',
            dataIndex: 'NickName'
        }, {
            title: '状态',
            dataIndex: 'IsValid',
            render: valid => ({ 1: '有效', 0: '无效' }[valid])
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span onClick={this.handleUserOper.bind(this, record)}>
                    <a href='#' data-oper='edit'>修改</a>
                    <Divider type='vertical' />
                    <a href='#' data-oper='del'>删除</a>
                </span>
            )
        }];

        return (
            <Fragment>
                <Table
                    rowKey='UserID'
                    dataSource={data}
                    columns={columns}
                    title={() => (<Button data-oper='add' type='primary' onClick={this.handleUserOper}>添加用户</Button>)}>

                </Table>
                {
                    isShowModal &&
                    <UserInfo
                        {...{
                            addSysUser,
                            editSysUser,
                            record,
                            sysRole,
                            listSysRole
                        }}
                        closeModal={this.closeModal} >
                    </UserInfo>
                }
            </Fragment>

        );
    }
}

UserTable.propTypes = {
    sysUser: PropTypes.object,
    addSysUser: PropTypes.func,
    editSysUser: PropTypes.func,
    listSysRole: PropTypes.func,
    delSysUser: PropTypes.func
};

UserTable = connect(
    (state) => ({
        sysUser: state.sysUser,
        sysRole: state.sysRole
    }),
    {
        addSysUser,
        delSysUser,
        editSysUser,
        listSysRole
    }
)(UserTable);

export default UserTable;