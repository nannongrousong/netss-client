import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import UserTable from './userTable';

import { LIST_DATA, ADD_DATA, EDIT_DATA, DEL_DATA } from 'ADMIN_ACTIONTYPE/tableData';

import { Button } from 'antd';

const mapStateToProps = (state) => {
    return {
        tableData: state.tableData
    };
};

const mapDispatchToProps = {
    testRedux: () => (dispatch, getState) => {
        setTimeout(() => {
            console.log('1s后添加一条记录！');
            dispatch({
                type: ADD_DATA,
                record: { key: new Date().getTime(), name: 'test', age: 24 }
            });
        }, 1000);
    },
    listData: () => ({
        type: LIST_DATA
    }),
    addData: (record) => ({
        type: ADD_DATA,
        record
    }),
    editData: (record) => ({
        type: EDIT_DATA,
        record
    }),
    delData: (key) => ({
        type: DEL_DATA,
        key
    })
};

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component {
    render() {
        const { tableData, listData, editData, addData, delData, testRedux } = this.props;
        //  console.log('this.props.history', this.props.history);
        return (
            <div>
                我现在是在page1
                <Button onClick={testRedux}>测试redux</Button>

                <UserTable
                    dataSource={tableData}
                    {...{
                        listData, editData, addData, delData
                    }}
                />
            </div>
        );
    }
}