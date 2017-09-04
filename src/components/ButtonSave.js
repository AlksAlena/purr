import React, { Component } from "react";
import Message from "./Message";

export default class ButtonSave extends Component {
	constructor(props) {
		super(props);
		this.state = { isPress: false };
	}

	render() {
		
		const onClick = () => {
			if (this.state.isPress == true) {
				this.setState({ isPress: false });
			} else {
				this.setState({ isPress: true });
			}
				
		};

		return (
			<div className="button_save">
				<input type="submit" value="Save" onClick={onClick} />
				{ this.state.isPress ? <Message data="Save"/>:"" }
			</div>
		);
	}
}