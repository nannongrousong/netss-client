import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listData, editPage } from 'ADMIN_ACTION_DEMO/table';
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
        return (
            <div>
                <UserTable />
            </div>
        );
    }
}

Index.propTypes = {
    listData: PropTypes.func,
    tabFirstIn: PropTypes.bool
};

Index = connect(
    (state) => ({}),
    {
        listData
    })(Index);

export default Index;