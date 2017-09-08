import React, { Component } from "react";
import Popup from "./Popup";

export default class ButtonSave extends Component {
	constructor(props) {
		super(props);
		this.state = { isPress: false };
		this.handleClick = this.handleClick.bind(this);
		this.addTask = this.addTask.bind(this);
		this.closePopup = this.closePopup.bind(this);
	}

	handleClick() {
		if (this.state.isPress) {
			this.setState({ isPress: false });
		} else {
			this.setState({ isPress: true });
			this.addTask();
			this.closePopup();
		}	
	}

	addTask() {
		this.props.add();
	}

	closePopup() {
		this.props.hidden();
	}

	render() {
		return (
			<div className="button_save">
				<input type="submit" value="Save" onClick={this.handleClick} />
			</div>
		);
	}
}