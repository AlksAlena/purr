import React, { Component } from "react";
import TaskList from "./TaskList";
import Button from "./Button";
import ColumnNewTitlePopup from "./ColumnNewTitlePopup";

export default class Column extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskList: [],
			isChangeTitle: false,
			title: this.props.title
		};
		this.addTask = this.addTask.bind(this);
		this.delTask = this.delTask.bind(this);
		this.editTask = this.editTask.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.editColumnTitle = this.editColumnTitle.bind(this);
	}

	addTask() { // task download from localSrorage
		let appStorage = localStorage;
		// parse task in object
		let task = JSON.parse(appStorage.getItem("task"));
		let oldTaskList = this.state.taskList;
		// instead string "new task" should be taskObject from localStorage
		let newTaskList = oldTaskList.concat(task.title);
		// let newTaskList = oldTaskList.concat("new task");
		this.setState({ taskList: newTaskList });
	}

	delTask() {
		alert("delete task!");
	}

	editTask() {
		alert("edit task");	
	}

	handleClick() {
		if (this.state.isChangeTitle) {
			this.setState({ isChangeTitle: false });
		} else {
			this.setState({ isChangeTitle: true });
		}	
	}

	editColumnTitle() {
		let newTitle = localStorage.getItem("columnNewTitle");
		this.setState({ title: newTitle });
		this.setState({ isChangeTitle: false });
	}

	render() {
		if(this.state.isChangeTitle) {
			return (
				<div className="col-sm-6 col-md-3 column">
					<h2>{this.state.title}</h2>
					<button className="btn" onClick={this.handleClick}>Edit title</button>
					<TaskList tasks={this.state.taskList} />
					<Button add={this.addTask}/>
					<ColumnNewTitlePopup editTitle={this.editColumnTitle} title={this.props.title}/>
				</div>
			);
		} else {
			return (
				<div className="col-sm-6 col-md-3 column">
					<h2>{this.state.title}</h2>
					<button className="btn" onClick={this.handleClick}>Edit title</button>
					<TaskList tasks={this.state.taskList} />
					<Button add={this.addTask}/>
				</div>
			);
		}		
	}
}