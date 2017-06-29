import React from 'react';
import {getPostItStyles} from '../util/PostItStyle';

export default class PostItNote extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			x: this.props.initialX || 0,
			y: this.props.initialY || 0,
			noteWidth: 150,
			noteHeight: 150,
			moveDelta: {},
			expandCoord: {},
			moving: false,
			expanding: false,
			deleted: false
		};
		this.onExpandMouseDown = this.onExpandMouseDown.bind(this);
		this.onExpandMouseUp = this.onExpandMouseUp.bind(this);
		this.expandNote = this.expandNote.bind(this);


		this.onMoveMouseDown = this.onMoveMouseDown.bind(this);
		this.onMoveMouseUp = this.onMoveMouseUp.bind(this);
		this.moveNote = this.moveNote.bind(this);

		this.deleteNote = this.deleteNote.bind(this);

		this.clickNote = this.clickNote.bind(this);
	}

	componentDidUpdate(nextProps, nextState) {
		//this is necessary to remove janky behavior between the React component updating and
		//the actual element shifting
		if (this.state.moving && !nextState.moving) {
			document.addEventListener('mousemove', this.moveNote);
			document.addEventListener('mouseup', this.onMoveMouseUp);
		} else if (!this.state.moving && nextState.moving) {
			document.removeEventListener('mousemove', this.moveNote);
			document.removeEventListener('mouseup', this.onMoveMouseUp);
		}

		if (this.state.expanding && !nextState.expanding) {
			document.addEventListener('mousemove', this.expandNote);
			document.addEventListener('mouseup', this.onExpandMouseUp);
		} else if (!this.state.expanding && nextState.expanding) {
			document.removeEventListener('mousemove', this.expandNote);
			document.removeEventListener('mouseup', this.onExpandMouseUp);
		}
	}

	onExpandMouseDown(e) {
		this.setState({
			expanding: true,
			expandCoord: {
				x: e.pageX,
				y: e.pageY
			}
		});
		e.stopPropagation();
		e.preventDefault();
	}

	onExpandMouseUp(e) {
		this.setState({expanding: false});
		e.stopPropagation();
		e.preventDefault();
	}

	expandNote(e) {
		if (!this.state.expanding || (e.pageX === this.state.expandCoord.x && e.pageY === this.state.expandCoord.y)) return;
		this.setState({
			noteWidth: this.state.noteWidth + e.pageX - this.state.expandCoord.x,
			noteHeight: this.state.noteHeight + e.pageY - this.state.expandCoord.y,
			expandCoord: {
				x: e.pageX,
				y: e.pageY
			}
		});
		e.stopPropagation();
		e.preventDefault();
	}

	onMoveMouseDown(e) {
		this.setState({
			moving: true,
			moveDelta: {
				x: e.pageX - this.state.x,
				y: e.pageY - this.state.y
			}
		});
		e.stopPropagation();
		e.preventDefault();
	}
	onMoveMouseUp(e) {
		this.setState({moving: false});
		e.stopPropagation();
		e.preventDefault();
	}
	moveNote(e) {
		if (!this.state.moving) return;
		this.setState({
			x: e.pageX - this.state.moveDelta.x,
			y: e.pageY - this.state.moveDelta.y
		});
		e.stopPropagation();
		e.preventDefault();
	}

	clickNote(e) {
		this.props.clickNote();
	}

	deleteNote(e) {
		this.setState({
			deleted: true
		});
	}

	render() {
		const noteClass = this.props.isSelected ? 'postit-note note-back' : 'postit-note';
		return (
			<div className={noteClass}
				style={getPostItStyles(this.state.x, this.state.y, this.props.isSelected, this.state.moving, this.state.expanding, this.state.noteHeight, this.state.noteWidth, this.state.deleted)}>
				<span onMouseDown={this.onMoveMouseDown} className="postit-title">Drag and drop</span>
				<span className="postit-delete" onClick={this.deleteNote}>X</span>
				{
					/*
					 I would have abstracted this into a separate prop, backText or something, but I had semi-screwed up my CSS classing by here and
					 didn't really have time to retrack it
					 */
				}
				{!this.props.isSelected && <div onClick={this.clickNote} className="postit-content">Click to flip!</div>}
				{this.props.isSelected && <div onClick={this.clickNote} className="postit-content">{this.props.text}</div>}
				<div className="postit-expander" onMouseDown={this.onExpandMouseDown}>+</div>
			</div>
		);
	}
}
