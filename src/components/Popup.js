import React, { Component } from "react";

export default class Popup  extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="overlay"></div>
				<div className={this.props.data}></div>
			</div>
		);
	}
}