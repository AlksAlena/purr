import React, { Component } from "react";
import Task from "./Task";

export default class TaskList extends Component {
	constructor(props) {
		super(props);
		this.upTask = this.upTask.bind(this);
	}
	
	upTask() {
		let taskList = this.props.tasks.map(function(item, index) {
			return (
				<div key={index}>
					<Task task={item}/>
				</div>
			);
		});

		return taskList;
	}

	render() {		
		return (
			<div className="tasks">
				{this.upTask()}
			</div>
		);
	}
}