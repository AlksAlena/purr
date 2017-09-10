import React, { Component } from "react";

export default class Popup  extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			isPress: false 
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		if (this.state.isPress) {
			this.setState({ isPress: false });
		} else {
			this.setState({ isPress: true });
			const appStorage = localStorage;
			//appStorage.setItem("author", "Petya");
			//console.log("new user: "+appStorage.getItem("author"))
		}	
	}

	render() {
		return (
			<div className="content">
				<h3>What is your name?</h3>
				<input type="text" name="userName" />
				<input type="submit" value="Save" onClick={this.handleClick} />
			</div>
		);
	}
}