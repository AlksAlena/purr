import React, { Component } from "react";
import PropTypes from "prop-types"; 

export default class Comment extends Component {
	constructor(props) {
		super(props);
		this.editComment = this.editComment.bind(this);
		this.updComment = this.updComment.bind(this);
		this.delComment = this.delComment.bind(this);
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
		console.log("edit comment");
		this.setState({ isEdit: true });
	}

	updComment() {
		console.log("update comment");
		localStorage.setItem("updCommentIndex", this.props.index);
		let prevText = this.props.comment.text;
		let updComment = {
			text: this.state.textComment ? this.state.textComment : prevText,
			author: this.props.comment.author,
			date: this.props.comment.date
		};
		// serialize object and upload in localStorage
		let serialUpdComment = JSON.stringify(updComment);
		localStorage.setItem("updComment", serialUpdComment);
		this.props.upd();
		this.setState({ isEdit: false });
	}

	delComment() {
		localStorage.setItem("delCommentIndex", this.props.index);
		this.props.del();
	}

	render() {
		return (
			<div className="comment" >
				{
					this.state.isEdit ?
					<input className="comment-text__edit" type="text" value={this.state.textComment} onChange={this.handleEditComment}/> :
					<p className="comment-text">{this.props.comment.text}</p>
				}
				<div className="comment-info">
					<span>{this.props.comment.author} </span>
					<span>{this.props.comment.date}</span>
					{
						this.state.isEdit ? 
						<a href="#" className="comment-btn__save"onClick={this.updComment}>
							<i className="icon-floppy"></i>
						</a> : ""
					}
					<a href="#" className="comment-btn__edit" onClick={this.editComment}>
						<i className="icon-pencil"></i>
					</a>
					<a href="#" className="comment-btn__delete" onClick={this.delComment}>
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
	del: PropTypes.func,
	upd: PropTypes.func,
};