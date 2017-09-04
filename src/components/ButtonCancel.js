import React, { Component } from "react";
import Message from "./Message";

export default class ButtonCancel extends Component {
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
			<div className="button_cancel">
				<input type="submit" value="Cancel" onClick={onClick} />
				{ this.state.isPress ? <Message data="Cancel"/>:"" }
			</div>
		);
	}
}