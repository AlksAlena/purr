import React, { Component } from "react";
import Desk from "./components/Desk";

export default class App extends Component {
	render() {
		return (
			<div className="app">
				<div className="app-header">
					<h1>Frello - powerful app for managing your tasks
						<small>Get's started it's FREE!</small>
					</h1>
				</div>
				<Desk />
			</div>
		);
	}
}