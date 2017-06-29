import React from 'react';
import PostItNote from './PostItNote';
import SwimLanes from './SwimLanes';

const defaultNotes = [
	{
		text: 'Blaine is dead'
	},
	{
		text: 'Remember to finish that disney thing'
	}
];

export default class NoteBoard extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			notes: defaultNotes,
			createText: '',
			selectedNote: null,
			showSwimLanes: false
		};

		this.addNote = this.addNote.bind(this);
		this.alterInputText = this.alterInputText.bind(this);
		this.toggleSwimLane = this.toggleSwimLane.bind(this);
	}

	addNote() {
		const tempNewNotes = this.state.notes.slice(0);
		tempNewNotes.push({text: this.state.createText});
		this.setState({notes: tempNewNotes});
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
		this.setState({
			showSwimLanes: !this.state.showSwimLanes
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.submitCreateNote}>
					<input className="create-input" onChange={this.alterInputText} />

					<button className="create-button" onClick={this.addNote}>Add note</button>
					<button className="toggle-swim-button" onClick={this.toggleSwimLane}>Toggle swim lane display</button>

				</form>

				{this.state.showSwimLanes && <SwimLanes />}

				{this.state.notes.map(
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
