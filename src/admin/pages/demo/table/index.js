import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listData, addData, editData, delData } from 'ADMIN_ACTION_DEMO/table';
import { TabWrapper } from 'ADMIN_PAGES_INDEX';
import PropTypes from 'prop-types';

import UserTable from './userTable';
@TabWrapper('tableDemo')
class Index extends Component {
    componentDidMount() {
        const { tabFirstIn, listData } = this.props;
        tabFirstIn && listData();
    }

    render() {
        const { tableDemo: { tableData }, listData, editData, addData, delData } = this.props;
        return (
            <div>
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

Index.propTypes = {
    tableDemo: PropTypes.object,
    listData: PropTypes.func,
    addData: PropTypes.func,
    editData: PropTypes.func,
    delData: PropTypes.func
};

Index = connect(
    (state) => ({
        tableDemo: state.tableDemo
    }),
    {
        listData,
        addData,
        editData,
        delData
    })(Index);

export default Index;