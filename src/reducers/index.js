import { combineReducers } from 'redux'; // Pure JavaScript
import userReducer from './userReducer';
import restaurantsReducer from './restaurantsReducer';
//import itemReducer from './itemReducer';

export default combineReducers({
    user: userReducer,
    restaurants: restaurantsReducer
})