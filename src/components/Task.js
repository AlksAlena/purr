import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Task extends Component {
	
	render() {
		return (
			<div className="task">
				<p>{this.props.task}</p>
			</div>
		);
	}
}