import React, { Component } from "react";
import Desk from "./components/Desk";
import NewUserPopup from "./components/NewUserPopup";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.downloadAuthor = this.downloadAuthor.bind(this);
		this.state = {
			author: ""
		};
	}

	downloadAuthor() {
		let authorLS = localStorage.getItem("author");
		(authorLS ? this.setState({ author: authorLS }): "");		
	}

	componentWillMount() {
		this.downloadAuthor();
	}

	render() {		
		return (
			<div className="container app">
				{ this.state.author ? 
					<h1 className="app-title">Hi, {this.state.author}</h1> : 
					<h1 className="app-title">Frello - powerful app for managing your tasks
						<small>Get's started it's FREE!</small>
					</h1>
				}
				<Desk />
				{ this.state.author ? "" : <NewUserPopup app={this} /> }
			</div>
		);
	}
}