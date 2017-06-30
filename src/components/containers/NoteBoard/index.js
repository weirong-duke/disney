import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import NoteBoard from './NoteBoard';
import {toggleSwimLanes, addNewNote, updateNoteInput, selectNote} from '../../../dux/NoteBoard';

const mapStateToProps = (state) => {
	return {
		noteList: state.board.noteList,
		boardProperties: state.board,
		noteInput: state.board.noteInput};
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
