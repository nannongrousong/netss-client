import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listData, addData, editData, delData, editPage } from 'ADMIN_ACTION_DEMO/table';
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
        const { tableDemo, listData, editData, addData, delData, editPage } = this.props;
        return (
            <div>
                <UserTable
                    {...{
                        listData, editData, addData, delData, tableDemo, editPage
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
    delData: PropTypes.func,
    editPage: PropTypes.func
};

Index = connect(
    (state) => ({
        tableDemo: state.tableDemo
    }),
    {
        listData,
        addData,
        editData,
        delData,
        editPage
    })(Index);

export default Index;