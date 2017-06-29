import NoteBoard from './NoteBoard';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
	return {noteList: state.noteList};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(NoteBoard);

export default Connected;
