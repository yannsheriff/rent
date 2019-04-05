import { combineReducers } from 'redux';
import { mainReducer } from './main';
import { stepReducer } from './steps';


const combinedReducers = combineReducers({
    mainReducer,
    stepReducer
});

export default combinedReducers;
