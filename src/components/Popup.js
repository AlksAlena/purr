import React, { Component } from "react";
import NewTaskPopup from "./NewTaskPopup";

export default class Popup  extends Component {
	render() {
		return (
			<div className="popup">
				<div className="overlay"></div>
				<div className="content">
					<h3>{this.props.title}</h3>
					{this.props.typePopup}
				</div>
			</div>
		);
	}
}