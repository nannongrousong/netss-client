import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSysRole, delSysRole, editSysRole, listSysRole } from 'ADMIN_ACTION_SYSMGR/role';
import { TabWrapper } from 'ADMIN_PAGES_INDEX';
import RoleTable from './roleTable';

@TabWrapper('sysRole')
class Index extends Component {
    componentDidMount() {
        const { listSysRole, tabFirstIn } = this.props;
        tabFirstIn && listSysRole();
    }

    render() {
        const { addSysRole, delSysRole, editSysRole, listSysRole, sysRole } = this.props;
        return (
            <div>
                <RoleTable
                    {...{
                        addSysRole,
                        delSysRole,
                        editSysRole,
                        listSysRole,
                        sysRole
                    }} >
                </RoleTable>
            </div>
        );
    }
}

Index.propTypes = {
    addSysRole: PropTypes.func,
    delSysRole: PropTypes.func,
    editSysRole: PropTypes.func,
    listSysRole: PropTypes.func,
    sysRole: PropTypes.array,
    tabFirstIn: PropTypes.bool
};

Index = connect(
    (state) => ({
        sysRole: state.sysRole
    }),
    {
        addSysRole,
        delSysRole,
        editSysRole,
        listSysRole
    }
)(Index);


export default Index;