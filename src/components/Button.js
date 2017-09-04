import React, { Component } from "react";
import NewTaskPopup from "./NewTaskPopup";

export default class Button extends Component {
	constructor(props) {
		super(props);
		this.state = { isPress: false };
		this.handleClick = this.handleClick.bind(this);
		this.msg = this.msg.bind(this);
		this.addTask = this.addTask.bind(this);
	}

	handleClick() {
		if (this.state.isPress) {
			this.setState({ isPress: false });
		} else {
			this.setState({ isPress: true });
		}	
	}

	msg() {
		this.props.msg();
	}

	addTask() {
		this.props.add();
	}

	render() {
		if(this.state.isPress) {
			return (
				<div className="button">
					<input type="submit" className="button-create" value="Add task" onClick={this.handleClick} />
					<NewTaskPopup msg={this.msg} add={this.addTask} /> 
				</div>
			);			
		}
		
		return (
			<div className="button">
				<input type="submit" className="button-create" value="Add task" onClick={this.handleClick} />
			</div>
		);
	}
}