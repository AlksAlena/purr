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
		this.handleChangeStateButton = this.handleChangeStateButton.bind(this);
	}

	handleClick() {
		if (this.state.isPress) {
			this.setState({ isPress: false });
		} else {
			this.setState({ isPress: true });
		}	
	}

	handleChangeStateButton() {
		this.setState({ isPress: false});
	}	

	addTask() {
		this.props.addTask();
	}

	render() {
		return (
			<div className="column-button__add">
				<i className="icon-doc-add" title="add task" onClick={this.handleClick} ></i>
				{ this.state.isPress ? 
					<NewTaskPopup 
						addTask={this.addTask} 
						handleChangeStateButton={this.handleChangeStateButton} 
						columnTitle={this.props.columnTitle}
					/> : ""
				}					 
			</div>
		);	
	}
}

Button.propTypes = {
	columnTitle: PropTypes.string,
	addTask: PropTypes.func
};