import React, { Component } from "react";
import Desk from "./components/Desk";
import NewUserPopup from "./components/NewUserPopup";

// localStorage.clear();

export default class App extends Component {
	render() {
		let author = localStorage.getItem("author");
		if(author) {
			console.log("Auhor: " + author);
			return (
				<div className="container app">
					<div className="app-header">
						<h1>Frello - powerful app for managing your tasks
							<small>Get's started it's FREE!</small>
						</h1>
					</div>
					<Desk />
				</div>
			);
		} else return (
			<div className="container app">
				<div className="app-header">
					<h1>Frello - powerful app for managing your tasks
						<small>Get's started it's FREE!</small>
					</h1>
				</div>
				<Desk />
				<NewUserPopup />
			</div>
		);
	}
}