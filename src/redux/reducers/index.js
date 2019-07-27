import { combineReducers } from 'redux';
import { MainPageReducer } from '../../pages/Main/redux/reducer';
import { DetailPageReducer } from '../../pages/Detail/redux/reducer';

export default combineReducers({
  MainPageReducer,
  DetailPageReducer
});