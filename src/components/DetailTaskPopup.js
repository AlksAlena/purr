import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { editTask, changeTitleTask, changeDescriptionTask, deleteTask, addComment, closePopup } from "../actions";

import CommentsList from "./CommentsList";

class DetailTaskPopup extends Component {
	constructor(props) {
		super(props);
		this.handleButtonEscape = this.handleButtonEscape.bind(this);
		this.state = {
			taskComment: "",
			isEdited: false
		};
	}

	componentDidMount() {
		document.body.addEventListener("keydown", this.handleButtonEscape);
	}

	componentWillUnmount() {
		document.body.removeEventListener("keydown", this.handleButtonEscape);
	}

	handleClosePopup() {
		this.props.closePopup(this.props.id);
	}

	handleButtonEscape() {
		if (event.keyCode == 27) {
			this.props.closePopup(this.props.id);
		}
	}

	handleChangeTitle(event) {
		this.props.changeTitleTask(event.target.value);
		this.handleIsEdited();
	}

	handleChangeDescription(event) {
		this.props.changeDescriptionTask(event.target.value);
		this.handleIsEdited();
	}

	handleDeleteButton() {
		this.props.deleteTask(this.props.popups.detailPopup.task.columnId, this.props.popups.detailPopup.task.indexTask); 
		this.props.closePopup(this.props.id);
	}

	handleChangeComment(event) {
		this.setState({ taskComment: event.target.value });
	}

	handleAddCommentButton() {
		if(this.state.taskComment) {
			this.props.addComment(this.state.taskComment);
			this.handleIsEdited();
		};
		this.setState({ taskComment: '' });
		
	}

	handleIsEdited() {
		this.setState({ isEdited: true });
	}

	handleSaveButton() {
		if(this.props.popups.detailPopup.task.title)  {
			this.props.editTask(
				this.props.popups.detailPopup.task.columnId, 
				this.props.popups.detailPopup.task.indexTask, 
				this.props.popups.detailPopup.task.title, 
				this.props.popups.detailPopup.task.description,
				this.props.popups.detailPopup.task.comments
			); 
		} else console.log("задача не будет сохранена!")
	}

	render() {
		return (
			<div className="DetailTaskPopup">
				<div className="overlay"></div>
				<div className="content">
					<a href="#" className="btn__close" title="close" onClick={this.handleClosePopup.bind(this)}>
						<i className="icon-cancel"></i>
					</a>

					<h2>
						<input className="content-text" 
							type="text" 
							placeholder="title is required !" 
							value={ this.props.popups.detailPopup.task.title } 
							onChange={this.handleChangeTitle.bind(this)}
						/>
					</h2>

					<label>Description:</label>
					{ this.props.popups.detailPopup.task.description.length > 42 ?
						<textarea className="content-text" 
							rows="4" 
							value={ this.props.popups.detailPopup.task.description } 
							onChange={this.handleChangeDescription.bind(this)}
						></textarea> :
						<textarea className="content-text" 
							rows="2" 
							value={ this.props.popups.detailPopup.task.description } 
							onChange={this.handleChangeDescription.bind(this)}
						></textarea>
					}

					<label>Comments:</label>
					<textarea rows="2" 
						className="content-comment" 
						value={this.state.taskComment} 
						onChange={this.handleChangeComment.bind(this)} 
						placeholder="Add a new comment...">
					></textarea>
					<button className="comment-btn__add" onClick={this.handleAddCommentButton.bind(this)}>Add comment</button>
					
					<CommentsList 
						comments={ this.props.popups.detailPopup.task.comments } 
						handleIsEdited={this.handleIsEdited.bind(this)} 
						handleSaveButton={this.handleSaveButton.bind(this)}
					/>

					<div className="content-info">
						<span>Author: </span>{this.props.popups.detailPopup.task.author}
					</div>
					<div className="content-info">
						<span>Column: </span>{this.props.popups.detailPopup.task.columnTitle}
					</div>

					{this.state.isEdited ? 
						<div>
							<a href="#" className="btn__save" title="save" onClick={this.handleSaveButton.bind(this)}>
								<i className="icon-floppy"></i>
							</a>
							<a href="#" className="btn__delete" title="delete" onClick={this.handleDeleteButton.bind(this)} >
								<i className="icon-trash-empty"></i>
							</a>
						</div> : 
						<div>
							<a href="#" className="btn__delete" title="delete" onClick={this.handleDeleteButton.bind(this)} >
								<i className="icon-trash-empty"></i>
							</a>
						</div>
					}	
					
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		popups: state.popupsReducer,
		columns: state.columnsReducer,
		id: 'detail'
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		changeTitleTask: bindActionCreators(changeTitleTask, dispatch),
		changeDescriptionTask: bindActionCreators(changeDescriptionTask, dispatch),
		editTask: bindActionCreators(editTask, dispatch),
		deleteTask: bindActionCreators(deleteTask, dispatch),
		addComment: bindActionCreators(addComment, dispatch),
		closePopup: bindActionCreators(closePopup, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailTaskPopup)