import React from 'react';
import TWEEN from 'tween.js';
import AutosizeTextarea from '../helper/AutosizeTextarea';

import messagesStore from '../stores/MessagesStore';
import dispatch from '../dispatch/dispatch';

const ENTER_KEY = 13;

export default class MessageInput extends React.Component {
	constructor(options) {
		super(options);

		this.state = {
			user: 'Joseph',
			inputOpacity: 0,
			buttonBottom: 10
		};

		this.tweenState = {
			inputOpacity: 0,
			buttonBottom: 10
		}

		this.toggleInputTween = new TWEEN.Tween(this.tweenState);
	}

	render() {
		return (
			<div id="message-input-container">
				<div className="centered" style={ { bottom: this.state.buttonBottom } } 
				     onClick={ this.handleClick.bind(this) } id="chat-button">
				</div>
				<textarea className="centered" scrollTop="10" onKeyUp={this.onKeyUp.bind(this)}
				 style={ { opacity: this.state.inputOpacity } } id="create-message" />
			</div>
		);
	}

	componentDidMount() {
		AutosizeTextarea(
			React
				.findDOMNode(this)
				.querySelector('textarea')
		);
	}

	onKeyUp(e) {
		if (e.which === ENTER_KEY) {
			let element = e.target;

			dispatch.dispatch({
				actionType: 'message-create',
				data: {
					user: this.state.user,
					content: element.value
				}
			});

			element.value = '';
			element.blur();

			this.hideTextarea();

		}

	}

	handleTween() {
		return this.setState(this.tweenState);
	}

	hideTextarea() {
		this.toggleInputTween
			.to({ inputOpacity: 0, buttonBottom: 10 }, 300)
			.easing(TWEEN.Easing.Quartic.Out)
			.onUpdate(this.handleTween.bind(this))
			.start();
	}

	handleClick() {
		console.log(1111)
		this.toggleInputTween
			.to({ inputOpacity: 1, buttonBottom: -200 }, 300)
			.easing(TWEEN.Easing.Quartic.Out)
			.onUpdate(this.handleTween.bind(this))
			.start();
	}

	resizeTextarea(textarea) {
	    var str = textarea.value;
	    var cols = textarea.cols;

	    var linecount = 0;
	    str.split("\n").forEach(function(l) {
	      linecount += Math.ceil( l.length / cols ); // take into account long lines
	    });
	}
}