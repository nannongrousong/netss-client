import tableDemo from './tableDemo'; 
import formDemo from './formDemo';
import homeNav from './homeNav';
import authInfo from './authInfo';

import { combineReducers }  from 'redux';

export default combineReducers({
    tableDemo,
    formDemo,
    authInfo,
    homeNav
});