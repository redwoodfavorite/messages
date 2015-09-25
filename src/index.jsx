import React from 'react';
import App from './components/App';
import TWEEN from 'tween.js';

React.render(<App />, document.body);

function update() {
	TWEEN.update();
	requestAnimationFrame(update);
}

update();