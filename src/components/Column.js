import React, { Component } from "react";
import TaskList from "./TaskList";
import Button from "./Button";

export default class Column extends Component {
	render() {
		return (
			<div className="column">
				<h2>{this.props.title}</h2>
				<TaskList tasks={this.props.tasks}/>
				<Button />
			</div>
		);
	}
}