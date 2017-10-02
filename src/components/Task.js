import React, { Component } from "react";
import PropTypes from "prop-types"; 
import DetailTaskPopup from "./DetailTaskPopup";

export default class Task extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.updateTask = this.updateTask.bind(this);
		this.deleteTask = this.deleteTask.bind(this);
		this.handleChangeStateButton = this.handleChangeStateButton.bind(this);
		this.state = {
			isDetail: false,
			isUpdate: false
		};	
	}

	updateTask() {
		localStorage.setItem(`updateIndex${this.props.initColumnTitle}`, this.props.index);
		this.props.updateTask();
	}

	deleteTask() {
		localStorage.setItem(`deleteIndex${this.props.initColumnTitle}`, this.props.index);
		this.props.deleteTask();
	}

	handleClick() {
		if (this.state.isDetail) {
			this.setState({ isDetail: false });
		} else {
			this.setState({ isDetail: true });
		}	
	}

	handleChangeStateButton() {
		this.setState({ isDetail: false});
	}

	render() {
		const divStyle = {
			backgroundColor: "rgba(32, 178, 170, 0.5)"
		};
		const { title, comment } = this.props.task;

		if(this.state.isDetail) {
			return (
				<div>
					<div className="task" style={divStyle} onClick={this.handleClick} >
						<p className="task-title">
							{title}
							<i className="icon-comment-empty" title="comments">{comment.length}</i>
						</p>
					</div>
					<DetailTaskPopup 
						task={this.props.task} 
						currentColumnTitle={this.props.customColumnTitle} 
						handleChangeStateButton={this.handleChangeStateButton} 
						deleteTask={this.deleteTask} 
						updateTask={this.updateTask}
					/>
				</div>
			);
		} else {
			return (
				<div className="task" onClick={this.handleClick} >
					<p className="task-title">
						{title}
						<i className="icon-comment-empty" title="comments">{comment.length}</i>
					</p>
				</div>
			);
		}
		
	}
}

Task.propTypes = {
	task: PropTypes.object,
	index: PropTypes.number,
	deleteTask: PropTypes.func,
	updateTask: PropTypes.func,
	initColumnTitle: PropTypes.string, 
	customColumnTitle: PropTypes.string,
};