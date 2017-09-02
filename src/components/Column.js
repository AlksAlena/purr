import React, { Component } from "react";
import ReactDOM from "react-dom";
import Area from "./Area";

export default class Column extends Component {
	render() {
		return (
			<div className="column">
				<h2>{this.props.title}</h2>
				<Area tasks={this.props.tasks} />
			</div>
		);
	}
}