import React, { Component } from "react";
import TaskList from "./TaskList";
import Button from "./Button";


export default class Column extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskList: ["clear floor"]
		};
		this.addTask = this.addTask.bind(this);
		this.delTask = this.delTask.bind(this);
		this.editTask = this.editTask.bind(this);
	}

	addTask() {
		let oldTaskList = this.state.taskList;
		let newTaskList = oldTaskList.concat("new task");
		this.setState({ taskList: newTaskList });
	}

	delTask() {
		this.taskList.push("delete task");	
	}

	editTask() {
		this.taskList.push("edit task");	
	}

	render() {
		return (
			<div className="column">
				<h2>{this.props.title}</h2>
				<TaskList tasks={this.state.taskList} />
				<Button add={this.addTask}/>
			</div>
		);
	}
}