import React, { Component } from "react";
import ReactDOM from "react-dom";
import Task from "./Task";

export default class Tasks extends Component {
	
	render() {
		const tasks = this.props.tasks;

		let tasksList = tasks.map(function(item, index) {
			return (
				<div key={index}>
					<Task task={item}/>
				</div>
			)
		});


		return (
			<div className="tasks">
				{tasksList}
			</div>
		);
	}
}