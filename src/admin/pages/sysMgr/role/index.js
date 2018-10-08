import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSysRole, delSysRole, editSysRole, listSysRole } from 'ADMIN_ACTION_SYSMGR/role';

import { listSysMenu } from 'ADMIN_ACTION_SYSMGR/menu';
import { TabWrapper } from 'ADMIN_PAGES_INDEX';
import RoleTable from './roleTable';

@TabWrapper('sysRole')
class Index extends Component {
    componentDidMount() {
        const { listSysRole, tabFirstIn } = this.props;
        tabFirstIn && listSysRole();
    }

    render() {
        const { addSysRole, delSysRole, editSysRole, listSysRole, sysRole, sysMenu, listSysMenu } = this.props;
        return (
            <Fragment>
                <RoleTable
                    {...{
                        addSysRole,
                        delSysRole,
                        editSysRole,
                        listSysRole,
                        sysRole,
                        sysMenu,
                        listSysMenu
                    }} >
                </RoleTable>
            </Fragment>
        );
    }
}

Index.propTypes = {
    addSysRole: PropTypes.func,
    delSysRole: PropTypes.func,
    editSysRole: PropTypes.func,
    listSysRole: PropTypes.func,
    listSysMenu: PropTypes.func,
    sysRole: PropTypes.array,
    tabFirstIn: PropTypes.bool
};

Index = connect(
    (state) => ({
        sysRole: state.sysRole,
        sysMenu: state.sysMenu
    }),
    {
        addSysRole,
        delSysRole,
        editSysRole,
        listSysRole,
        listSysMenu
    }
)(Index);


export default Index;