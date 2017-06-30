const defaultState = {
	showSwimLanes: false,
	noteList: [
		{
			text: 'Blaine is dead'
		}, {
			text: 'Remember to finish that disney thing'
		}
	]
};

//reducer
export default function boardProperties(state = defaultState, action) {
	switch (action.type) {
		case TOGGLE_SWIM_LANES:
			return {
				showSwimLanes: !state.showSwimLanes
			};
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
		case SELECT_NOTE:
			return {
				...state,
				selectedNote: action.noteIndex
			};
		default:
			return state;
	}
}

//basic actions
const TOGGLE_SWIM_LANES = 'NOTEBOARD/TOGGLE_SWIM_LANES';
const ADD_NEW_NOTE = 'NOTEBOARD/ADD_NEW_NOTE';
const UPDATE_NOTE_INPUT = 'NOTEBOARD/UPDATE_NOTE_INPUT';
const SELECT_NOTE = 'NOTEBOARD/SELECT_NOTE';

export function toggleSwimLanes() {
	return {type: TOGGLE_SWIM_LANES};
}

export function addNewNote(noteObj) {
	return {type: ADD_NEW_NOTE, note: noteObj};
}

export function updateNoteInput(text) {
	return {
		type: UPDATE_NOTE_INPUT,
		text
	}
}

export function selectNote(noteIndex) {
	return {
		type: SELECT_NOTE,
		noteIndex
	}
}
