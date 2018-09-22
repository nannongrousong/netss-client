import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LIST_DATA, ADD_DATA, EDIT_DATA, DEL_DATA } from 'ADMIN_ACTIONTYPE/tableDemo';

import UserTable from './userTable';

class Index extends Component {
    render() {
        const { tableDemo, listData, editData, addData, delData } = this.props;
        return (
            <div>
                <UserTable
                    dataSource={tableDemo}
                    {...{
                        listData, editData, addData, delData
                    }}
                />
            </div>
        );
    }
}

Index = connect(
    (state) => ({
        tableDemo: state.tableDemo
    }),
    {
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
    })(Index);

export default Index;