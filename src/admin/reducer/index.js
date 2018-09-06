import selectData from 'ADMIN_REDUCER/selectData';
import tableData from 'ADMIN_REDUCER/tableData'; 
import { combineReducers }  from 'redux';

export default combineReducers({
    selectData,
    tableData
});

