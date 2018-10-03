import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSysUser, delSysUser, editSysUser, listSysUser } from 'ADMIN_ACTION_SYSMGR/user';
import { listSysRole } from 'ADMIN_ACTION_SYSMGR/role';
import { TabWrapper } from 'ADMIN_PAGES_INDEX';
import UserTable from './userTable';

@TabWrapper('sysUser')
class Index extends Component {
    componentDidMount() {
        const { listSysUser, tabFirstIn } = this.props;
        tabFirstIn && listSysUser();
    }

    render() {
        const { addSysUser, delSysUser, editSysUser, listSysUser, sysUser, sysRole, listSysRole } = this.props;
        return (
            <div>
                <UserTable
                    {...{
                        addSysUser,
                        delSysUser,
                        editSysUser,
                        listSysUser,
                        sysUser,
                        sysRole,
                        listSysRole
                    }} >
                </UserTable>
            </div>
        );
    }
}

Index.propTypes = {
    addSysUser: PropTypes.func,
    delSysUser: PropTypes.func,
    editSysUser: PropTypes.func,
    listSysUser: PropTypes.func,
    sysUser: PropTypes.object,
    sysRole: PropTypes.array,
    listSysRole: PropTypes.func,
    tabFirstIn: PropTypes.bool
};

Index = connect(
    (state) => ({
        sysUser: state.sysUser,
        sysRole: state.sysRole
    }),
    {
        addSysUser,
        delSysUser,
        editSysUser,
        listSysUser,
        listSysRole
    }
)(Index);


export default Index;