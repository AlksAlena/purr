import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers/makeRootReducer';

import App from './App.jsx';

const store = createStore(makeRootReducer, composeWithDevTools(applyMiddleware(thunk)));
window.store = store;

store.subscribe(() => {
	let tmpDeskState = store.getState();
	let tmpDeskStateSerial = JSON.stringify(tmpDeskState);
	localStorage.setItem('deskState', tmpDeskStateSerial);
}); 

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'));