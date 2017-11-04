import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editComment, deleteComment } from '../reducers/popups';

import PropTypes from 'prop-types'; 

const propTypes = {
	indexComment: PropTypes.number.isRequired,
	comment: PropTypes.object.isRequired,
	handleIsEdited: PropTypes.func.isRequired,
	handleSaveButton: PropTypes.func.isRequired
};

class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEdit: false,
			textComment: this.props.comment.text
		};
		this.handleSaveButton = this.handleSaveButton.bind(this);
		this.handleEditButton = this.handleEditButton.bind(this);
		this.handleDeleteButton = this.handleDeleteButton.bind(this);
		this.handleChangeComment = this.handleChangeComment.bind(this);
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
						onChange={this.handleChangeComment}
					/> : <p className="comment-text">{text}</p>
				}
				<div className="comment-info">
					<span>{author} </span>
					<span>{date}</span>
					
					{ this.state.isEdit ? 
						<a href="#" className="comment-btn__edit" onClick={this.handleSaveButton}>
							<i className="icon-floppy"></i>
						</a> : 
						<a href="#" className="comment-btn__edit" onClick={this.handleEditButton}>
							<i className="icon-pencil"></i>
						</a>
					}

					<a href="#" className="comment-btn__delete" onClick={this.handleDeleteButton}>
						<i className="icon-trash-empty"></i>
					</a>						
				</div>				
			</div>
		);		
	}
}

Comment.propTypes = propTypes;

const mapStateToProps = (state) => {
	return {
		columns: state.columnsReducer,
		popups: state.popupsReducer
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		editComment,
		deleteComment
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment)