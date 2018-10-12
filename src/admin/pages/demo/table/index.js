import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { listData } from 'ADMIN_ACTION_DEMO/table';
import { TabWrapper } from 'ADMIN_PAGES_INDEX';
import PropTypes from 'prop-types';

import { authResource } from 'COMMON_COMPONENT/AuthResource';
import UserTable from './userTable';
@TabWrapper('tableDemo')
class Index extends Component {
    componentDidMount() {
        const { tabFirstIn, listData } = this.props;
        tabFirstIn && listData();
    }

    render() {
        return (
            <Fragment>
                {authResource('Res-Btn-Test')(<a href='#'>权限按钮</a>)}
                <UserTable />
            </Fragment>
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