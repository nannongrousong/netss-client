import tableDemo from './tableDemo'; 
import homeNav from './homeNav';
import authInfo from './authInfo';

import { combineReducers }  from 'redux';

export default combineReducers({
    tableDemo,
    authInfo,
    homeNav
});