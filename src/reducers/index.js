import { combineReducers } from 'redux'; // Pure JavaScript
import userReducer from './userReducer';
//import itemReducer from './itemReducer';

export default combineReducers({
    user: userReducer
})