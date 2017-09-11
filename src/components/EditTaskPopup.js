import React, { Component } from "react";

export default class EditTaskPopup extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={this.state.className}>
				alert("EditTaskPopup")
			</div>
		);
	}
}