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
		this.downloadTaskList = this.downloadTaskList.bind(this);
		this.downloadColumnTitle = this.downloadColumnTitle.bind(this);
		this.addTask = this.addTask.bind(this);
		this.delTask = this.delTask.bind(this);
		this.updTask = this.updTask.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.editColumnTitle = this.editColumnTitle.bind(this);
	}

	addTask() { // task download from localSrorage
		let appStorage = localStorage;
		// parse task in object
		let task = JSON.parse(appStorage.getItem("task"));
		let oldTaskList = this.state.taskList;
		// taskObject from localStorage
		let newTaskList = oldTaskList.concat(task);
		this.setState({ taskList: newTaskList });
		// serialize object and upload in localStorage
		var newTaskListSerial = JSON.stringify(newTaskList);
		let nameColumn = this.props.title;
		appStorage.setItem(`taskList${nameColumn}`, newTaskListSerial);
		localStorage.removeItem("task");
	}

	delTask() {
		console.log("start delete task");
		let nameColumn = this.props.title;
		// get index of elem for delete
		let delIndex = localStorage.getItem(`delIndex${nameColumn}`);
		console.log("key delete: " + delIndex);
		// processing array (del elem)
		let tmpTaskList = this.state.taskList;
		tmpTaskList.splice(delIndex, 1);
		// set new state - rerender and remove used delIndex
		this.setState({ taskList: tmpTaskList });
		localStorage.removeItem(`delIndex${nameColumn}`);
		console.log("set new state and remove delIndex");
		// serialize object and upload in localStorage taskList
		var tmpTaskListSerial = JSON.stringify(tmpTaskList);
		localStorage.setItem(`taskList${nameColumn}`, tmpTaskListSerial);
		console.log("taskListLS update");
	}

	updTask() {
		let nameColumn = this.props.title;
		console.log("update task ");
		let updIndex = localStorage.getItem(`updIndex${nameColumn}`);
		console.log("updIndex: " + updIndex);
		// get Obj from LS - parse task in object
		let updTask = JSON.parse(localStorage.getItem("updTask"));
		// processing array (replacement elem)
		let tmpTaskList = this.state.taskList;
		tmpTaskList.splice(updIndex, 1, updTask);
		// set new state - rerender and remove used updIndex
		this.setState({ taskList: tmpTaskList });
		localStorage.removeItem(`updIndex${nameColumn}`);
		// remove used updTask object from LS
		localStorage.removeItem("updTask");
		console.log("set new state and remove updIndex");
		// serialize object and upload in localStorage taskList
		var tmpTaskListSerial = JSON.stringify(tmpTaskList);
		localStorage.setItem(`taskList${nameColumn}`, tmpTaskListSerial);
		console.log("taskListLS update");
	}

	handleClick() {
		if (this.state.isChangeTitle) {
			this.setState({ isChangeTitle: false });
		} else {
			this.setState({ isChangeTitle: true });
		}	
	}

	editColumnTitle() {
		// download new title from LS
		let newTitle = localStorage.getItem(`columnTitle${this.props.title}`);
		this.setState({ title: newTitle });
		this.setState({ isChangeTitle: false });
	}

	downloadColumnTitle() {	
		let nameColumn = this.props.title;
		// if exist custom title for the column - download	
		(
			localStorage.getItem(`columnTitle${nameColumn}`) ? 
				this.setState({ title: localStorage.getItem(`columnTitle${nameColumn}`) }) :
				this.setState({ title: nameColumn })
		);
	}

	downloadTaskList() {
		let nameColumn = this.props.title;
		// if exist taskList for the column - download
		if(localStorage.getItem(`taskList${nameColumn}`)) {
			let taskListLS = JSON.parse(localStorage.getItem(`taskList${nameColumn}`));
			this.setState({ taskList: taskListLS });
		}
	}

	componentWillMount() {
		// download exist title and taskList from LS
		this.downloadColumnTitle();
		this.downloadTaskList();
	}

	render() {
		return (
			<div className="col-sm-6 col-md-3 column">
				<h2>{this.state.title}<i className="icon-pencil" onClick={this.handleClick}></i></h2>
				<TaskList tasks={this.state.taskList} column={this} />
				<Button column={this} />
				{ this.state.isChangeTitle ?
					<ColumnNewTitlePopup parent={this} /> :
					""
				}
			</div>
		);
	}
}