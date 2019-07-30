import { combineReducers } from 'redux';
import currentDataReducer from './currentDataReducer';
import fiveDayDataReducer from './fiveDayDataReducer';
import errorReducer from './errorReducer';
import setCityReducer from './setCityReducer';

export default combineReducers({
    current: currentDataReducer,
    errors: errorReducer,
    fiveday: fiveDayDataReducer,
    city: setCityReducer
});