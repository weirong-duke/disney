import React from 'react';
import PostItNote from '../../exports/PostItNote';
import {generateSwimLanes} from './util';


export default class NoteBoard extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			createText: '',
			selectedNote: null
		};

		this.alterInputText = this.alterInputText.bind(this);
		this.addNote = this.addNote.bind(this);
		this.toggleSwimLane = this.toggleSwimLane.bind(this);
	}

	addNote() {
		this.props.addNewNote({text: this.state.createText});
	}

	alterInputText(e) {
		this.setState({createText: e.target.value});
	}
	submitCreateNote(e) {
		e.preventDefault();
	}

	selectNote(noteIndex) {
		if (this.state.selectedNote === noteIndex) {
			this.setState({selectedNote: null});
		}
		else {
			this.setState({selectedNote: noteIndex});
		}
	}

	toggleSwimLane(e) {
		e.preventDefault();
		this.props.toggleSwimLanes();
	}

	render() {
		return (
			<div>
				<form onSubmit={this.submitCreateNote}>
					<input className="create-input" onChange={this.alterInputText} />

					<button className="create-button" onClick={this.addNote}>Add note</button>
					<button className="toggle-swim-button" onClick={this.toggleSwimLane}>Toggle swim lane display</button>

				</form>

				{this.props.boardProperties.showSwimLanes && generateSwimLanes()}

				{this.props.noteList && this.props.noteList.map(
					(note, noteIndex) => {
						return <PostItNote
							initialY={80}
							initialX={10}
							clickNote={() => this.selectNote(noteIndex)}
							isSelected={noteIndex === this.state.selectedNote}
							key={noteIndex}
							text={note.text} />;
					})
				}
			</div>
		);
	}
}
