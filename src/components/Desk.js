import React, { Component } from "react";
import { connect } from "react-redux";

import Column from "./Column";

class Desk extends Component {
	render() {		
		return(	
			<div className="row app-content">
				<Column 
					id="todo" 
					tasks={this.props.columns.todo} 
				/>
				<Column 
					id="progress" 
					tasks={this.props.columns.progress} 
				/>
				<Column 
					id="test" 
					tasks={this.props.columns.test} 
				/>
				<Column 
					id="done" 
					tasks={this.props.columns.done} 
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

const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Desk)