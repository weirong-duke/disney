import {combineReducers} from 'redux';

import boardReducer from './NoteBoard';

export default combineReducers({board: boardReducer});
