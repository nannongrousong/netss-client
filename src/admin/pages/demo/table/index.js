import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listData, addData, editData, delData } from 'ADMIN_ACTION/tableDemo';
import { TabWrapper } from 'ADMIN_PAGES_INDEX';
import PropTypes from 'prop-types';

import UserTable from './userTable';
@TabWrapper('tableDemo')
class Index extends Component {
    componentDidMount() {
        const { tabFirstIn } = this.props;
    }

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

Index.propTypes = {
    tableDemo: PropTypes.array,
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