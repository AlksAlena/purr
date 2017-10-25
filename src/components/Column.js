import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { newTitleColumnPopup, newTaskPopup } from "../actions";
import PropTypes from "prop-types"; 
import TasksList from "./TasksList";
import NewTaskPopup from "./NewTaskPopup";
import NewTitleColumnPopup from "./NewTitleColumnPopup";

class Column extends Component {

	handleNewTitle() {
		this.props.newTitleColumnPopup(this.props.id, this.props.columns[`${this.props.id}Title`]);
	}

	handleAddButton() {
		this.props.newTaskPopup(this.props.id);
	}

	render() {
		return (
			<div className="col-sm-6 col-md-3 column">
				<h2 className="column-title">{this.props.columns[`${this.props.id}Title`]}
					<i className="icon-pencil" title="edit title" onClick={this.handleNewTitle.bind(this)}></i>
				</h2>
				<TasksList columnId={this.props.id} tasks={this.props.tasks} columnTitle={this.props.columns[`${this.props.id}Title`]}/>
				<button 
					className="column-button__add" 
					type="submit" 
					value="Add" 
					onClick={this.handleAddButton.bind(this)}
				>
					<i className="icon-doc-add" title="add task" ></i>
				</button>	

				{ this.props.popups.newTaskPopup.show && <NewTaskPopup /> }

				{ this.props.popups.newTitleColumnPopup.show && <NewTitleColumnPopup />}

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		columns: state.columnsReducer,
		popups: state.popupsReducer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		newTitleColumnPopup: bindActionCreators(newTitleColumnPopup, dispatch),
		newTaskPopup: bindActionCreators(newTaskPopup, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Column)