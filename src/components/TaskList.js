import React, { Component } from "react";
import PropTypes from "prop-types"; 
import Task from "./Task";

export default class TaskList extends Component {
	constructor(props) {
		super(props);
		this.generateTask = this.generateTask.bind(this);
		this.delTask = this.delTask.bind(this);
		this.updTask = this.updTask.bind(this);
	}

	delTask() {
		this.props.column.delTask();
	}

	updTask() {
		this.props.column.updTask();
	}

	generateTask(item, index) {
		// task - current task
		// del(), upd() - functions
		// currentColumnTitle - current title of the column (may be change after init)
		return (
			<div key={index}>
				<Task task={item} 
					index={index} 
					del={this.delTask} 
					upd={this.updTask} 
					initColumnTitle={this.props.column.props.title} 
					currentColumnTitle={this.props.column.state.title}
				/>
			</div>
		);
	}

	render() {	
		let taskList = this.props.tasks.map(this.generateTask);
		return (
			<div className="tasks">
				{taskList}
			</div>
		);
	}
}

TaskList.propTypes = {
	tasks: PropTypes.array,
	column: PropTypes.object,
};