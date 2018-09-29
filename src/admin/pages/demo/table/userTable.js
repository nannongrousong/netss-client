import React, { Component } from 'react';
import { Table, Tag, Divider, Modal, Button } from 'antd';
import { tagsSource } from 'ADMIN_CONFIG_ENUM/roleTags';

import UserInfo from './userInfo';

class UserTable extends Component {
    state = {
        showModal: false,
        record: null
    }

    startEditUser = (record) => {
        this.setState({
            showModal: true,
            record
        });
    }

    startAddUser = () => {
        this.setState({
            showModal: true,
            record: null
        });
    }

    startDelUser = (user_id) => {
        const { delData } = this.props;
        Modal.confirm({
            title: '信息',
            content: '您确定要删除当前选中用户吗？',
            onOk: () => {
                delData(user_id);
            }
        });
    }

    closeModal = () => {
        this.setState({
            showModal: false,
            record: null
        });
    }

    render() {
        const { showModal, record } = this.state;
        const { addData, editData } = this.props;

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            render: (text, record) => <a href='#' onClick={this.startEditUser.bind(this, record)}>{text}</a>
        }, {
            title: '年龄',
            dataIndex: 'age'
        }, {
            title: '地址',
            dataIndex: 'address'
        }, {
            title: '标签',
            dataIndex: 'tag',
            render: tag => (
                <span>
                    {tag && tag.map(item => <Tag color='blue' key={item}>{tagsSource[item]}</Tag>)}
                </span>
            )
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href='#' onClick={this.startEditUser.bind(this, record)}>修改</a>
                    <Divider type='vertical' />
                    <a href='#' onClick={this.startDelUser.bind(this, record.user_id)}>删除</a>
                </span>
            )
        }];

        return (
            <div>
                <Button onClick={this.startAddUser} className='mb-16'>添加用户</Button>
                <Table
                    {...this.props}
                    rowKey={'user_id'}
                    columns={columns}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['8', '15'],
                        showTotal: (total, range) => (`第${range[0]}-${range[1]}条 共${total}条`),
                        pageSize: 8
                    }} >
                </Table>
                {
                    showModal
                    && <UserInfo
                        addData={addData}
                        editData={editData}
                        closeModal={this.closeModal}
                        record={record} />
                }
            </div>
        );
    }
}

export default UserTable;