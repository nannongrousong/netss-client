import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserTable from './userTable';

import { LIST_DATA, ADD_DATA, EDIT_DATA, DEL_DATA } from 'ADMIN_ACTION/tableData';

const mapStateToProps = (state) => {
    return {
        tableData: state.tableData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        listData: () => {
            dispatch({
                type: LIST_DATA
            });
        },
        addData: (record) => {
            dispatch({
                type: ADD_DATA,
                record
            });
        },
        editData: (record) => {
            dispatch({
                type: EDIT_DATA,
                record
            });
        },
        delData: (key) => {
            dispatch({
                type: DEL_DATA,
                key
            });
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component {
    render() {
        const { tableData, listData, editData, addData, delData } = this.props;

        return (
            <div>
                我现在是在page1
                <Link to='/page2' >page2</Link>
                <br />
                <Link to='/page3' >page3</Link>

                
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