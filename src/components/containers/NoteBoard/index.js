import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import NoteBoard from './NoteBoard';
import {toggleSwimLanes, addNewNote} from '../../../dux/NoteBoard';

const mapStateToProps = (state) => {
	return {noteList: state.board.noteList, boardProperties: state.board};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		toggleSwimLanes,
		addNewNote
	}, dispatch);
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(NoteBoard);

export default Connected;
