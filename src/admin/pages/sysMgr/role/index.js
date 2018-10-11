import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listSysRole } from 'ADMIN_ACTION_SYSMGR/role';

import { TabWrapper } from 'ADMIN_PAGES_INDEX';
import RoleTable from './roleTable';

@TabWrapper('sysRole')
class Index extends Component {
    componentDidMount() {
        const { listSysRole, tabFirstIn } = this.props;
        tabFirstIn && listSysRole();
    }

    render() {
        return (
            <Fragment>
                <RoleTable>
                </RoleTable>
            </Fragment>
        );
    }
}

Index.propTypes = {
    listSysRole: PropTypes.func,
    tabFirstIn: PropTypes.bool
};

Index = connect(
    (state) => ({}),
    {
        listSysRole
    }
)(Index);


export default Index;