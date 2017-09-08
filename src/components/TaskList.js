import React, { Component } from "react";
import Task from "./Task";

export default class TaskList extends Component {
	
	render() {	
		let taskList = this.props.tasks.map(function(item, index) {
			return (
				<div key={index}>
					<Task task={item}/>
				</div>
			);
		});

		return (
			<div className="tasks">
				{taskList}
			</div>
		);
	}
}