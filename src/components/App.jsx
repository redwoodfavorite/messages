import React from 'react';
import MessageLog from './MessageLog';
import MessageInput from './MessageInput';

export default class App extends React.Component {
	render() {
		return (
			<div id="app-container">
				<MessageLog />
				<MessageInput />
			</div>
		);
	}
}