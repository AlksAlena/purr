import React, { Component } from "react";
import NewTaskPopup from "./NewTaskPopup";

export default class Button extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			isPress: false 
		};
		this.handleClick = this.handleClick.bind(this);
		this.addTask = this.addTask.bind(this);
	}

	handleClick() {
		if (this.state.isPress) {
			this.setState({ isPress: false });
		} else {
			this.setState({ isPress: true });
		}	
	}

	addTask() {
		this.props.column.addTask();
	}

	render() {
		return (
			<div className="button">
				<input type="submit" className="btn-add" value="Add task" onClick={this.handleClick} />
				{ this.state.isPress ? 
					<NewTaskPopup add={this.addTask} button={this} colTitle={this.props.column.state.title}/> : ""
				}					 
			</div>
		);	
	}
}