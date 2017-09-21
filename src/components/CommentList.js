import React, { Component } from "react";
import PropTypes from "prop-types"; 
import Comment from "./Comment";

export default class CommentList extends Component {
	constructor(props) {
		super(props);
		this.generateComment = this.generateComment.bind(this);
		this.delComment = this.delComment.bind(this);
		this.updComment = this.updComment.bind(this);
	}

	delComment() {
		this.props.del();
	}

	updComment() {
		this.props.upd();
	}

	generateComment(item, index) {
		// comment - current comment
		// del(), upd() - functions
		// currentColumnTitle - current title of the column (may be change after init)
		return (
			<div key={index}>
				<Comment comment={item} 
					index={index} 
					del={this.delComment} 
					upd={this.updComment}
				/>
			</div>
		);
	}

	render() {	
		let commentList = this.props.comments.map(this.generateComment);
		return (
			<div className="comments">
				{commentList}
			</div>
		);
	}
}

CommentList.propTypes = {
	comments: PropTypes.array,
	del: PropTypes.func,
	upd: PropTypes.func,	
};