import React, { Component } from "react";
import Column from "./Column";

export default class Desk extends Component {
	render() {
		return (
			<div className="row app-content">
				<Column title="TODO" />
				<Column title="In Progress" />
				<Column title="Testing" />
				<Column title="Done" />
			</div>
		);
	}
}