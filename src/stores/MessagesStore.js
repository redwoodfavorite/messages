import Store from 'flux/lib/FluxStore';
import dispatch from '../dispatch/dispatch';

import sampleMessageData from '../data/messages';

class MessagesStore extends Store {
	constructor() {
		super(dispatch);

		this._messages = sampleMessageData;
	}

	__onDispatch(payload) {
		
		if (payload.actionType === 'message-create') {
			this._messages.push(
				payload.data
			);

			this.__emitChange();
		}
	}

	getAll() {
		return this._messages;
	}
}

module.exports = new MessagesStore();