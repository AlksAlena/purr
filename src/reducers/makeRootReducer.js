import { combineReducers } from 'redux';
import { popupsReducer } from './popups';
import { columnsReducer } from './columns';

export default combineReducers({
	columnsReducer,
	popupsReducer
});