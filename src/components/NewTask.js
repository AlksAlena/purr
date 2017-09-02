import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class NewTask extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="overlay"></div>
				<div className="create-task">
					<div className="new-task">
						Hey! It's your new task!
					</div>
				</div>
			</div>
		);
	}
}