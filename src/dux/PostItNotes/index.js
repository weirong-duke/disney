const defaultState = {
	noteList: [
		{
			text: 'Blaine is dead'
		}, {
			text: 'Remember to finish that disney thing'
		}
	]
};

//reducer
export default function notes(state = defaultState, action) {
	switch (action.type) {
		default:
			return state;
	}
}

//basic actions
