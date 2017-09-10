import React, { Component } from "react";
import NewUserPopup from "./NewUserPopup";

export default class Popup  extends Component {
	render() {
		return (
			<div className="popup">
				<div className="overlay"></div>
				<NewUserPopup />
			</div>
		);
	}
}