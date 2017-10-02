import React, { Component } from "react";
import PropTypes from "prop-types"; 
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
		this.deleteTask = this.deleteTask.bind(this);
		this.updateTask = this.updateTask.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.editColumnTitle = this.editColumnTitle.bind(this);
		this.handleChangeStateButton = this.handleChangeStateButton.bind(this);
	}

	addTask() {
		let task = JSON.parse(localStorage.getItem("task"));
		let oldTaskList = this.state.taskList;
		let newTaskList = oldTaskList.concat(task);
		this.setState({ taskList: newTaskList });
		var newTaskListSerial = JSON.stringify(newTaskList);
		let nameColumn = this.props.title;
		localStorage.setItem(`taskList${nameColumn}`, newTaskListSerial);
		localStorage.removeItem("task");
	}

	deleteTask() {
		let nameColumn = this.props.title;
		let delIndex = localStorage.getItem(`delIndex${nameColumn}`);
		let tmpTaskList = this.state.taskList;
		tmpTaskList.splice(delIndex, 1);
		this.setState({ taskList: tmpTaskList });
		localStorage.removeItem(`delIndex${nameColumn}`);
		var tmpTaskListSerial = JSON.stringify(tmpTaskList);
		localStorage.setItem(`taskList${nameColumn}`, tmpTaskListSerial);
	}

	updateTask() {
		let nameColumn = this.props.title;
		let updIndex = localStorage.getItem(`updIndex${nameColumn}`);
		let updTask = JSON.parse(localStorage.getItem("updTask"));
		let tmpTaskList = this.state.taskList;
		tmpTaskList.splice(updIndex, 1, updTask);
		this.setState({ taskList: tmpTaskList });
		localStorage.removeItem(`updIndex${nameColumn}`);
		localStorage.removeItem("updTask");
		var tmpTaskListSerial = JSON.stringify(tmpTaskList);
		localStorage.setItem(`taskList${nameColumn}`, tmpTaskListSerial);
	}

	handleChangeStateButton() {
		this.setState({ isChangeTitle: false });
	}

	handleClick() {
		if (this.state.isChangeTitle) {
			this.setState({ isChangeTitle: false });
		} else {
			this.setState({ isChangeTitle: true });
		}	
	}

	editColumnTitle() {
		let newTitle = localStorage.getItem(`columnTitle${this.props.title}`);
		this.setState({ title: newTitle });
		this.setState({ isChangeTitle: false });
	}

	downloadColumnTitle() {	
		let nameColumn = this.props.title;
		( localStorage.getItem(`columnTitle${nameColumn}`) ? 
			this.setState({ title: localStorage.getItem(`columnTitle${nameColumn}`) }) :
			this.setState({ title: nameColumn })
		);
	}

	downloadTaskList() {
		let nameColumn = this.props.title;
		if(localStorage.getItem(`taskList${nameColumn}`)) {
			let taskListLS = JSON.parse(localStorage.getItem(`taskList${nameColumn}`));
			this.setState({ taskList: taskListLS });
		}
	}

	componentDidMount() {
		this.downloadColumnTitle();
		this.downloadTaskList();
	}

	render() {
		return (
			<div className="col-sm-6 col-md-3 column">
				<h2 className="column-title">{this.state.title}
					<i className="icon-pencil" title="edit title" onClick={this.handleClick}></i>
				</h2>
				<TaskList 
					tasks={this.state.taskList} 
					deleteTask={this.deleteTask} 
					updateTask={this.updateTask} 
					initColumnTitle={this.props.title} 
					customColumnTitle={this.state.title}
				/>
				<Button addTask={this.addTask} columnTitle={this.state.title} />
				{ this.state.isChangeTitle ?
					<ColumnNewTitlePopup 
						handleChangeStateButton={this.handleChangeStateButton} 
						editColumnTitle={this.editColumnTitle} 
						initColumnTitle={this.props.title} 
						customColumnTitle={this.state.title}
					/> : ""
				}
			</div>
		);
	}
}

Column.propTypes = {
	title: PropTypes.string,
};