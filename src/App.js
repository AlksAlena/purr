import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducers from "./reducers";

import Desk from "./components/Desk";
import NewUserPopup from "./components/NewUserPopup";
// ----------------------------
const store = createStore(rootReducers);
window.store = store;

store.subscribe(() => {
	let tmpDeskState = store.getState();
	let tmpDeskStateSerial = JSON.stringify(tmpDeskState);
	localStorage.setItem("deskState", tmpDeskStateSerial);
}); 

// ----------------------------

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			author: store.getState().columnsReducer.author
		};
	}

	componentDidMount() {
		store.subscribe(() => {
			let tmpAuthor = store.getState().columnsReducer.author;
			this.setState({ author: tmpAuthor });
		}); 
	}

	render() {
		return(		
			<Provider store={store}>	
				<div className="container app">
					{ this.state.author ? 
					<h1 className="app-title">Hi, { this.state.author }!</h1> : 
					<h1 className="app-title">Frello - powerful app for managing your tasks
						<small>Get's started it's FREE!</small>
					</h1> }
					
					<Desk />	
					{ this.state.author ? "" : <NewUserPopup />  }
				</div>	
			</Provider>		
		);
	}
}