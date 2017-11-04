import React, { Component } from 'react';
import { connect } from 'react-redux';

import Column from './Column.jsx';

class Desk extends Component {
	render() {		
		const { todo, progress, test, done } = this.props.columns;
		
		return(	
			<div className="row app-content">
				<Column 
					id="todo" 
					tasks={todo} 
				/>
				<Column 
					id="progress" 
					tasks={progress} 
				/>
				<Column 
					id="test" 
					tasks={test} 
				/>
				<Column 
					id="done" 
					tasks={done} 
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		columns: state.columnsReducer
	}
}

export default connect(mapStateToProps)(Desk)