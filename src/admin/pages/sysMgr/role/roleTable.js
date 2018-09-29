import React, { Component, Fragment } from 'react';
import { Table, Divider, Button } from 'antd';
import PropTypes from 'prop-types';
import RoleInfo from './roleInfo';

class RoleTable extends Component {
    state = {
        isShowModal: false,
        record: null
    }

    startEdit = (record) => {
        this.setState({
            isShowModal: true,
            record
        });
    }

    startAdd = () => {
        this.setState({
            isShowModal: true
        });
    }

    startDel = (roleID) => {

    }

    closeModal = () => {
        this.setState({
            isShowModal: false
        });
    }

    render() {
        const { sysRole, addSysRole, editSysRole } = this.props;
        const { isShowModal, record } = this.state;

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
                    isShowModal &&
                    <RoleInfo
                        addSysRole={addSysRole}
                        editSysRole={editSysRole}
                        closeModal={this.closeModal}
                        record={record}>
                    </RoleInfo>
                }
            </Fragment>

        );
    }
}

RoleTable.propTypes = {
    sysRole: PropTypes.array,
    addSysRole: PropTypes.func,
    editSysRole: PropTypes.func
};

export default RoleTable;