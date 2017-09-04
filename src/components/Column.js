import React, { Component } from "react";
import TaskList from "./TaskList";
import Button from "./Button";


export default class Column extends Component {
	constructor(props) {
		super(props);
		this.taskList = ["clear floor","buy meat"];
		this.addTask = this.addTask.bind(this);
		this.delTask = this.delTask.bind(this);
		this.editTask = this.editTask.bind(this);
		this.msg = this.msg.bind(this);
	}

	msg() {
		alert("Your message!");
	}

	addTask() {
		this.taskList.push("new task");	
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
				<TaskList tasks={this.taskList}/>
				<Button msg={this.msg} add={this.addTask}/>
			</div>
		);
	}
}