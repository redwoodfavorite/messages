import React from 'react';
import MessagesStore from '../stores/MessagesStore';

export default class MessageLog extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: 'Joseph',
			messages: []
		};

		MessagesStore.addListener(
			this.handleNewMessage.bind(this)
		);
	}

	handleNewMessage() {
		this.setState({
			messages: MessagesStore.getAll()
		});
	}
	
	componentDidUpdate() {
		document.body.scrollTop = document.body.scrollHeight;
	}

	render() {

		var lastMessageUser;
		var messages = [];

		MessagesStore.getAll().forEach(message => {
			var isSelf = message.user === this.state.user;
			var className = isSelf ? 'message me' : 'message other';
			var addHeader = !isSelf && (message.user !== lastMessageUser);

			if (addHeader) {
				messages.push(
					<h2 className="message-user-header">
						@ {message.user}
					</h2>
				);
			}

			messages.push(
				<li className={className} key={message.id}>
					<span>{message.content}</span>
				</li>
			);

			lastMessageUser = message.user;
		});

		return (
			<div id="message-log-container">
				<ul id="message-log">
					{ messages }
				</ul>
			</div>
		);
	}
}