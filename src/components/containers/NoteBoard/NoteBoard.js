import React from 'react';
import PostItNote from '../../exports/PostItNote';
import {generateSwimLanes} from './util';


export default class NoteBoard extends React.PureComponent {
	constructor(props) {
		super(props);

		this.addNote = this.addNote.bind(this);
		this.alterInputText = this.alterInputText.bind(this);
		this.toggleSwimLane = this.toggleSwimLane.bind(this);
		this.selectNote = this.selectNote.bind(this);
	}

	addNote() {
		this.props.addNewNote({text: this.props.noteInput});
	}

	alterInputText(e) {
		this.props.updateNoteInput(e.target.value);
	}
	submitCreateNote(e) {
		e.preventDefault();
	}

	selectNote(noteIndex) {
		const selectedNote = this.props.boardProperties.selectedNote;
		if (selectedNote === noteIndex) {
			this.props.selectNote(null);
		}
		else {
			this.props.selectNote(noteIndex);
		}
	}

	toggleSwimLane(e) {
		e.preventDefault();
		this.props.toggleSwimLanes();
	}

	render() {
		return this.props.boardProperties ? (
			<div>
				<form onSubmit={this.submitCreateNote}>
					<input className="create-input" value={this.props.noteInput} onChange={this.alterInputText} />

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
							isSelected={noteIndex === this.props.boardProperties.selectedNote}
							key={noteIndex}
							text={note.text} />;
					})
				}
			</div>
		) : <div>Loading...</div>
	}
}
