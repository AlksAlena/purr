import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import Task from './Task.jsx';

const propTypes = {
	columnId: PropTypes.string.isRequired,
	tasks: PropTypes.array.isRequired,
	columnTitle: PropTypes.string.isRequired
};

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
						/>
					);
				})}
			</div>
		);
	}
}

TasksList.propTypes = propTypes;

