import React from 'react';
import ReactDOM from 'react-dom';
import NoteBoard from './components/containers/NoteBoard';
import './styles/main.scss';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combinedReducers from './dux';

let store = createStore(
    combinedReducers
);


const Main = () => {
	return (
		<Provider store={store}>
			<NoteBoard />
		</Provider>
	);
};

ReactDOM.render(<Main />, document.getElementById('app'));

if (module.hot) {
	module.hot.accept();
}
