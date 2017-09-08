import React, { Component } from "react";
import Column from "./Column";
import Popup from "./Popup";

export default class Desk extends Component {
	render() {
		return (
			<div className="app-content clearfix">
				<Column title="TODO" />
				<Column title="In Progress" />
				<Column title="Testing" />
				<Column title="Done" />
			</div>
		);
	}
}
