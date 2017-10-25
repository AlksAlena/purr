import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { editComment, deleteComment } from "../actions";

class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEdit: false,
			textComment: this.props.comment.text
		};
	}

	handleChangeComment(event) {
		this.setState({ textComment: event.target.value });
	}

	handleEditButton() {
		this.setState({ isEdit: true });
	}

	handleSaveButton() {
		if(this.state.textComment) {
			this.props.editComment(this.props.indexComment, this.state.textComment);
			this.props.handleSaveButton();
			this.setState({ isEdit: false });
		}		
	}

	handleDeleteButton() {
		this.props.deleteComment(this.props.indexComment);
		this.props.handleIsEdited();
	}

	render() {
		const { text, author, date } = this.props.comment;

		return (
			<div className="comment" >
				{
					this.state.isEdit ?
					<input 
						className="comment-text__edit" 
						type="text" 
						value={this.state.textComment} 
						onChange={this.handleChangeComment.bind(this)}
					/> : <p className="comment-text">{text}</p>
				}
				<div className="comment-info">
					<span>{author} </span>
					<span>{date}</span>
					
					{ this.state.isEdit ? 
						<a href="#" className="comment-btn__edit" onClick={this.handleSaveButton.bind(this)}>
							<i className="icon-floppy"></i>
						</a> : 
						<a href="#" className="comment-btn__edit" onClick={this.handleEditButton.bind(this)}>
							<i className="icon-pencil"></i>
						</a>
					}

					<a href="#" className="comment-btn__delete" onClick={this.handleDeleteButton.bind(this)}>
						<i className="icon-trash-empty"></i>
					</a>						
				</div>				
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
		editComment: bindActionCreators(editComment, dispatch),
		deleteComment: bindActionCreators(deleteComment, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)