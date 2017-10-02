import React, { Component } from "react";
import PropTypes from "prop-types"; 
import Task from "./Task";

export default class TaskList extends Component {
	render() {	
		const { deleteTask, updateTask, initColumnTitle, customColumnTitle } = this.props;
		let taskList = this.props.tasks.map((task, index) => 
			<div key={index}>
				<Task 
					task={task}
					index={index} 
					deleteTask={deleteTask} 
					updateTask={updateTask} 
					initColumnTitle={initColumnTitle} 
					customColumnTitle={customColumnTitle}
				/>
			</div>
		);
		return (
			<div className="tasks">
				{taskList}
			</div>
		);
	}
}

TaskList.propTypes = {
	tasks: PropTypes.array,
	deleteTask: PropTypes.func,
	updateTask: PropTypes.func,
	initColumnTitle: PropTypes.string,
	customColumnTitle: PropTypes.string
};