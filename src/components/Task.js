import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { detailTaskPopup } from "../actions";

import DetailTaskPopup from "./DetailTaskPopup";

class Task extends Component {
	handleDetailPopup() {
		this.props.detailTaskPopup(this.props.columnId, this.props.columnTitle, this.props.indexTask, this.props.task);
	}

	render() {
		const divStyle = {
			backgroundColor: "rgba(32, 178, 170, 0.5)"
		};
		const { indexTask } = this.props;
		const { title, comments } = this.props.task;

		return (
			<div>
				<div className="task" onClick={this.handleDetailPopup.bind(this)} >
					<p className="task-title">
							{title}
						<i className="icon-comment-empty" title="comments">{ comments.length }</i>
					</p>
				</div>
				{ this.props.popups.detailPopup.show && <DetailTaskPopup /> }
			</div>
		);		
	}
}

const mapStateToProps = (state) => {
	return {
		popups: state.popupsReducer
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		detailTaskPopup: bindActionCreators(detailTaskPopup, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)