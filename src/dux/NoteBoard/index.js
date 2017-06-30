const defaultState = {
	showSwimLanes: false,
	selectedNote: null
};

//reducer
export default function boardReducer(state = defaultState, action) {
	switch (action.type) {
		case TOGGLE_SWIM_LANES:
			return {
				showSwimLanes: !state.showSwimLanes
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
const SELECT_NOTE = 'NOTEBOARD/SELECT_NOTE';

export function toggleSwimLanes() {
	return {type: TOGGLE_SWIM_LANES};
}

export function selectNote(noteIndex) {
	return {
		type: SELECT_NOTE,
		noteIndex
	};
}
