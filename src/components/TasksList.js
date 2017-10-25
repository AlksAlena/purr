import React, { Component } from "react";

import Task from "./Task";

export default class TasksList extends Component {
	render() {		
		return(	
			<div className="tasks">
				{this.props.tasks.map((task, index) => {
					return (
					<Task 
						key={index} 
						indexTask={index} 
						task={task} 
						columnId={this.props.columnId} 
						columnTitle={this.props.columnTitle} 
					/>);
				})}
			</div>
		);
	}
}