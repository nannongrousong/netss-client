import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listSysUser } from 'NETSS_ACTION_SYSMGR/user';
import { TabWrapper } from 'NETSS_PAGES_INDEX';
import UserTable from './userTable';

@TabWrapper('sysUser')
class Index extends Component {
    componentDidMount() {
        const { listSysUser, tabFirstIn } = this.props;
        tabFirstIn && listSysUser();
    }

    render() {
        return (
            <Fragment>
                <UserTable>
                </UserTable>
            </Fragment>
        );
    }
}

Index.propTypes = {
    listSysUser: PropTypes.func,
    tabFirstIn: PropTypes.bool
};

Index = connect(
    (state) => ({}),
    {
        listSysUser
    }
)(Index);


export default Index;