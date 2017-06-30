const defaultState = {
	noteList: [
		{
			text: 'Blaine is dead'
		}, {
			text: 'Remember to finish that disney thing'
		}
	],
	noteInput: ''
};

//reducer
export default function notesReducer(state = defaultState, action) {
	switch (action.type) {
		case ADD_NEW_NOTE:
			return {
				...state,
				noteList: state.noteList.slice(0).concat(action.note),
				noteInput: ''
			};
		case UPDATE_NOTE_INPUT:
			return {
				...state,
				noteInput: action.text
			};
		default:
			return state;
	}
}

//basic actions
const ADD_NEW_NOTE = 'NOTES/ADD_NEW_NOTE';
const UPDATE_NOTE_INPUT = 'NOTES/UPDATE_NOTE_INPUT';

export function addNewNote(noteObj) {
	return {type: ADD_NEW_NOTE, note: noteObj};
}

export function updateNoteInput(text) {
	return {
		type: UPDATE_NOTE_INPUT,
		text
	}
}
