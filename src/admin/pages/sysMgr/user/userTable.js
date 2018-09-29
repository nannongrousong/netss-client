import React, { Component, Fragment } from 'react';
import { Table, Divider } from 'antd';
import PropTypes from 'prop-types';
import UserInfo from './userInfo';

class UserTable extends Component {
    state = {
        isShowModal: false,
        record: null
    }

    startEditUser = (record) => {
        this.setState({
            isShowModal: true,
            record
        });
    }

    startDelUser = (userID) => {

    }

    closeModal = () => {
        this.setState({
            isShowModal: false
        });
    }

    render() {
        const { sysUser: { data }, addSysUser, editSysUser } = this.props;
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
                    <a href='#' onClick={this.startDelUser.bind(this, record.UserID)}>删除</a>
                </span>
            )
        }];

        return (
            <Fragment>
                <Table
                    rowKey='UserID'
                    dataSource={data}
                    columns={columns}>

                </Table>
                {
                    isShowModal &&
                    <UserInfo
                        addSysUser={addSysUser}
                        editSysUser={editSysUser}
                        closeModal={this.closeModal}
                        record={record}>
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