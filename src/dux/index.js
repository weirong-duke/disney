import {combineReducers} from 'redux';

import boardReducer from './NoteBoard';
import notesReducer from './Notes';

export default combineReducers({
	board: boardReducer,
	notes: notesReducer
});
