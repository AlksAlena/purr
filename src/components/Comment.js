import React, { Component } from "react";
import PropTypes from "prop-types"; 

export default class Comment extends Component {
	constructor(props) {
		super(props);
		this.editComment = this.editComment.bind(this);
		this.updateComment = this.updateComment.bind(this);
		this.deleteComment = this.deleteComment.bind(this);
		this.handleEditComment = this.handleEditComment.bind(this);
		this.state = {
			isEdit: false,
			textComment: this.props.comment.text
		};	
	}

	handleEditComment(event) {
		this.setState({ textComment: event.target.value });
	}

	editComment() {
		this.setState({ isEdit: true });
	}

	updateComment() {
		localStorage.setItem("updateCommentIndex", this.props.index);
		let prevText = this.props.comment.text;
		let updateComment = {
			text: this.state.textComment ? this.state.textComment : prevText,
			author: this.props.comment.author,
			date: this.props.comment.date
		};
		let serialUpdComment = JSON.stringify(updateComment);
		localStorage.setItem("updateComment", serialUpdComment);
		this.props.updateComment();
		this.setState({ isEdit: false });
	}

	deleteComment() {
		localStorage.setItem("deleteCommentIndex", this.props.index);
		this.props.deleteComment();
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
						onChange={this.handleEditComment}
					/> : <p className="comment-text">{text}</p>
				}
				<div className="comment-info">
					<span>{author} </span>
					<span>{date}</span>
					{
						this.state.isEdit ? 
						<a href="#" className="comment-btn__save"onClick={this.updateComment}>
							<i className="icon-floppy"></i>
						</a> : ""
					}
					<a href="#" className="comment-btn__edit" onClick={this.editComment}>
						<i className="icon-pencil"></i>
					</a>
					<a href="#" className="comment-btn__delete" onClick={this.deleteComment}>
						<i className="icon-trash-empty"></i>
					</a>						
				</div>				
			</div>
		);		
	}
}

Comment.propTypes = {
	comment: PropTypes.object,
	index: PropTypes.number,
	deleteComment: PropTypes.func,
	updateComment: PropTypes.func,
};