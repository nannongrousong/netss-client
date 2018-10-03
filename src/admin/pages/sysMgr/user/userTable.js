import React, { Component, Fragment } from 'react';
import { Table, Divider, Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import UserInfo from './userInfo';
import { errorHandle } from 'COMMON_UTILS/common';

class UserTable extends Component {
    state = {
        isShowModal: false,
        record: null
    }

    startAdd = () => {
        this.setState({
            isShowModal: true,
            record: null
        });
    }

    startEditUser = (record) => {
        this.setState({
            isShowModal: true,
            record
        });
    }

    startDelUser = ({UserID, LoginName}) => {
        let delModal = Modal.confirm({
            title: '删除确认',
            content: `您确定要删除[${LoginName}]吗？`,
            onOk: () => {
                const { delSysUser } = this.props;
                delSysUser(UserID).then(delModal.destroy).catch(errorHandle);
            }
        });
    }

    closeModal = () => {
        this.setState({
            isShowModal: false
        });
    }

    render() {
        const { sysUser: { data }, addSysUser, editSysUser, sysRole, listSysRole } = this.props;
        const { isShowModal, record } = this.state;

        const columns = [{
            title: '登录名',
            dataIndex: 'LoginName',
            render: (text, record) => <a href='#' onClick={this.startEditUser.bind(this, record)}>{text}</a>
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
                <span>
                    <a href='#' onClick={this.startEditUser.bind(this, record)}>修改</a>
                    <Divider type='vertical' />
                    <a href='#' onClick={this.startDelUser.bind(this, record)}>删除</a>
                </span>
            )
        }];

        return (
            <Fragment>
                <Table
                    rowKey='UserID'
                    dataSource={data}
                    columns={columns}
                    title={() => (<Button type='primary' onClick={this.startAdd}>添加用户</Button>)}>

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
    editSysUser: PropTypes.func
};

export default UserTable;