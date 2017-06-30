import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import NoteBoard from './NoteBoard';
import {toggleSwimLanes, selectNote} from '../../../dux/NoteBoard';
import {updateNoteInput, addNewNote} from '../../../dux/Notes';

const mapStateToProps = (state) => {
	return {
		noteList: state.notes.noteList,
		boardProperties: state.board,
		noteInput: state.notes.noteInput};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		toggleSwimLanes,
		addNewNote,
		updateNoteInput,
		selectNote
	}, dispatch);
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(NoteBoard);

export default Connected;
