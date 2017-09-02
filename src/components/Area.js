import React, { Component } from "react";
import ReactDOM from "react-dom";
import Tasks from "./Tasks";
import Button from "./Button";

export default class Area extends Component {	
	render() {
		return (
			<div className="area">
				<div className="workArea">
					<Tasks tasks={this.props.tasks}/>
				</div>
				<Button />
			</div>
		);
	}
}