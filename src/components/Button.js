import React, { Component } from "react";
import PropTypes from "prop-types"; 
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
			<div className="column-button__add">
				<i className="icon-doc-add" title="add task" onClick={this.handleClick} ></i>
				{ this.state.isPress ? 
					<NewTaskPopup add={this.addTask} button={this} colTitle={this.props.column.state.title}/> : ""
				}					 
			</div>
		);	
	}
}

Button.propTypes = {
	column: PropTypes.object,
};