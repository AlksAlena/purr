import React, { Component } from "react";
import NewTaskPopup from "./NewTaskPopup";

export default class Button extends Component {
	constructor(props) {
		super(props);
		this.state = { isPress: false };
		this.handleClick = this.handleClick.bin(this);
	}

	handleClick() {
		if (this.state.isPress) {
			this.setState({ isPress: false });
		} else {
			this.setState({ isPress: true });
		}	
	}

	render() {
		if(this.state.isPress) {
			return (
				<NewTaskPopup /> 
			);
		}
		return (
			<div className="button">
				<input type="submit" className="button-create" value="Add task" onClick={this.handleClick} />
			</div>
		);
	}
}