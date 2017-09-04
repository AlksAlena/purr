import React, { Component } from "react";
import Popup from "./Popup";

export default class ButtonCancel extends Component {
	constructor(props) {
		super(props);
		this.state = { isPress: false };
		this.handleClick = this.handleClick.bind(this);
		this.msg = this.msg.bind(this);
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

	render() {
		if(this.state.isPress) {
			this.msg();	
		}
		
		return (
			<div className="button_cancel">
				<input type="submit" value="Cancel" onClick={this.handleClick} />
			</div>
		);
	}
}