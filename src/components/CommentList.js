import React, { Component } from "react";
import PropTypes from "prop-types"; 
import Comment from "./Comment";

export default class CommentList extends Component {
	render() {	
		const { updateComment, deleteComment } = this.props;
		let commentList = this.props.comments.map((comment, index) =>
			<div key={index}>
				<Comment 
					comment={comment} 
					index={index} 
					deleteComment={deleteComment} 
					updateComment={updateComment}
				/>
			</div>
		);
		return (
			<div className="comments">
				{commentList}
			</div>
		);
	}
}

CommentList.propTypes = {
	comments: PropTypes.array,
	deleteComment: PropTypes.func,
	updateComment: PropTypes.func,	
};