import tableData from 'ADMIN_REDUCER/tableData'; 
import navMenu from './home';
import { combineReducers }  from 'redux';

export default combineReducers({
    tableData,
    navMenu
});