import React, { Component } from "react";

export default class Message extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="overlay"></div>
				<div>
					{this.props.data}
				</div>
			</div>
		);
	}
}