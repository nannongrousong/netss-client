import tableData from './tableData'; 
import homeNav from './homeNav';
import authInfo from './authInfo';

import { combineReducers }  from 'redux';

export default combineReducers({
    tableData,
    authInfo,
    homeNav
});