import React, { Component } from "react";
import Popup from "./Popup";

export default class ButtonSave extends Component {
	constructor(props) {
		super(props);
		this.state = { isPress: false };
		this.handleClick = this.handleClick.bind(this);
		this.msg = this.msg.bind(this);
		this.addTask = this.addTask.bind(this);
	}

	handleClick() {
		if (this.state.isPress) {
			this.setState({ isPress: false });
		} else {
			this.setState({ isPress: true });
		}	
	}

	msg() {
		this.props.msg();
	}

	addTask() {
		this.props.add();
	}

	render() {
		if(this.state.isPress) {
			this.msg();
			this.addTask();
		}
		
		return (
			<div className="button_save">
				<input type="submit" value="Save" onClick={this.handleClick} />
			</div>
		);
	}
}