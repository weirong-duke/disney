'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PostItNote = function (_React$PureComponent) {
	_inherits(PostItNote, _React$PureComponent);

	function PostItNote(props) {
		_classCallCheck(this, PostItNote);

		var _this = _possibleConstructorReturn(this, (PostItNote.__proto__ || Object.getPrototypeOf(PostItNote)).call(this, props));

		_this.state = {
			x: _this.props.initialX || 0,
			y: _this.props.initialY || 0,
			noteWidth: 150,
			noteHeight: 150,
			moveDelta: {},
			expandCoord: {},
			moving: false,
			expanding: false,
			deleted: false
		};
		_this.onExpandMouseDown = _this.onExpandMouseDown.bind(_this);
		_this.onExpandMouseUp = _this.onExpandMouseUp.bind(_this);
		_this.expandNote = _this.expandNote.bind(_this);

		_this.onMoveMouseDown = _this.onMoveMouseDown.bind(_this);
		_this.onMoveMouseUp = _this.onMoveMouseUp.bind(_this);
		_this.moveNote = _this.moveNote.bind(_this);

		_this.deleteNote = _this.deleteNote.bind(_this);

		_this.clickNote = _this.clickNote.bind(_this);
		return _this;
	}

	_createClass(PostItNote, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate(nextProps, nextState) {
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
	}, {
		key: 'onExpandMouseDown',
		value: function onExpandMouseDown(e) {
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
	}, {
		key: 'onExpandMouseUp',
		value: function onExpandMouseUp(e) {
			this.setState({ expanding: false });
			e.stopPropagation();
			e.preventDefault();
		}
	}, {
		key: 'expandNote',
		value: function expandNote(e) {
			if (!this.state.expanding || e.pageX === this.state.expandCoord.x && e.pageY === this.state.expandCoord.y) return;
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
	}, {
		key: 'onMoveMouseDown',
		value: function onMoveMouseDown(e) {
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
	}, {
		key: 'onMoveMouseUp',
		value: function onMoveMouseUp(e) {
			this.setState({ moving: false });
			e.stopPropagation();
			e.preventDefault();
		}
	}, {
		key: 'moveNote',
		value: function moveNote(e) {
			if (!this.state.moving) return;
			this.setState({
				x: e.pageX - this.state.moveDelta.x,
				y: e.pageY - this.state.moveDelta.y
			});
			e.stopPropagation();
			e.preventDefault();
		}
	}, {
		key: 'clickNote',
		value: function clickNote(e) {
			this.props.clickNote();
		}
	}, {
		key: 'deleteNote',
		value: function deleteNote(e) {
			this.setState({
				deleted: true
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _state = this.state,
			    x = _state.x,
			    y = _state.y,
			    moving = _state.moving,
			    expanding = _state.expanding,
			    deleted = _state.deleted,
			    noteHeight = _state.noteHeight,
			    noteWidth = _state.noteWidth;

			var noteClass = this.props.isSelected ? 'postit-note note-back' : 'postit-note';
			return _react2.default.createElement(
				'div',
				{ className: noteClass,
					style: (0, _util.generatePostItStyles)(x, y, this.props.isSelected, moving, expanding, noteHeight, noteWidth, deleted) },
				_react2.default.createElement(
					'span',
					{ onMouseDown: this.onMoveMouseDown, className: 'postit-title' },
					'Drag and drop'
				),
				_react2.default.createElement(
					'span',
					{ className: 'postit-delete', onClick: this.deleteNote },
					'X'
				),
				!this.props.isSelected && _react2.default.createElement(
					'div',
					{ onClick: this.clickNote, className: 'postit-content' },
					'Click to flip!'
				),
				this.props.isSelected && _react2.default.createElement(
					'div',
					{ onClick: this.clickNote, className: 'postit-content' },
					this.props.text
				),
				_react2.default.createElement(
					'div',
					{ className: 'postit-expander', onMouseDown: this.onExpandMouseDown },
					'+'
				)
			);
		}
	}]);

	return PostItNote;
}(_react2.default.PureComponent);

exports.default = PostItNote;