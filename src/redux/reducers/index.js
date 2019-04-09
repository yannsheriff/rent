import { combineReducers } from 'redux';
import { mainReducer } from './main';
import { stepReducer } from './steps';
import { profilReducer } from './profil';


const combinedReducers = combineReducers({
  mainReducer,
  stepReducer,
  profilReducer,
});

export default combinedReducers;
