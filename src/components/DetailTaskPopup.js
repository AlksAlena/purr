import React, { Component } from "react";
import PropTypes from "prop-types"; 
import classNames from "classnames";
import CommentList from "./CommentList";

export default class DetailTaskPopup extends Component {
	constructor(props) {
		super(props);
		this.closePopup = this.closePopup.bind(this);
		this.handleButtonEscape = this.handleButtonEscape.bind(this);
		this.handleDeleteTaskClick = this.handleDeleteTaskClick.bind(this);
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangeDescr = this.handleChangeDescr.bind(this);
		this.handleChangeComment = this.handleChangeComment.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.addComment = this.addComment.bind(this);
		this.updateComment = this.updateComment.bind(this);
		this.deleteComment = this.deleteComment.bind(this);
		this.state = {
			className: "detailTaskPopup",
			taskTitle: "",
			taskDescr: "",
			taskComment: "",
			isEdited: false,
			commentList: this.props.task.comment
		};
	}

	componentDidMount() {
		document.body.addEventListener("keydown", this.handleButtonEscape);
	}

	componentWillUnmount() {
		document.body.removeEventListener("keydown", this.handleButtonEscape);
	}

	closePopup() {
		const classes = classNames(this.state.className, "hidden");
		this.setState({ className: classes });
		this.props.handleChangeStateButton();
	}

	handleButtonEscape() {
		if (event.keyCode == 27) {
			this.closePopup();
		}
	}

	handleChangeTitle(event) {
		this.setState({taskTitle: event.target.value});
		this.props.task.title = event.target.value;
	}

	handleChangeDescr(event) {
		this.setState({taskDescr: event.target.value});
		this.props.task.descr = event.target.value;
	}

	handleChangeComment(event) {
		this.setState({taskComment: event.target.value});
	}

	addComment() {
		if(this.state.taskComment) {
			let today = new Date();
			let now = today.getDate() + "-" + (today.getMonth() + 1) + 
				"-" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes();
			let comment = {
				text: this.state.taskComment,
				author: localStorage.getItem("author"), //not author of the task
				date: now
			};
			let oldCommentList = this.state.commentList;
			let newCommentList = oldCommentList.concat(comment);
			this.setState({ commentList: newCommentList });
			this.setState({ taskComment: "" });
			this.setState({ isEdited: true });
		}
	}

	updateComment() {
		let updateIndex = localStorage.getItem("updateCommentIndex");
		let tmpCommentList = this.state.commentList;
		let newComment = JSON.parse(localStorage.getItem("updateComment"));
		tmpCommentList.splice(updateIndex, 1, newComment);
		this.setState({ commentList: tmpCommentList });
		localStorage.removeItem("updateCommentIndex");
		localStorage.removeItem("updateComment");
		this.setState({ isEdited: true });
	}

	deleteComment() {
		let deleteIndex = localStorage.getItem("deleteCommentIndex");
		let tmpCommentList = this.state.commentList;
		tmpCommentList.splice(deleteIndex, 1);
		this.setState({ commentList: tmpCommentList });
		localStorage.removeItem("deleteCommentIndex");
		this.setState({ isEdited: true });
	}

	handleDeleteTaskClick() {
		this.props.deleteTask();
		this.closePopup();
	}

	onFocus() {
		this.setState({ isEdited: true });
	}

	handleSubmit(event) {
		if(this.state.isEdited) {
			const { title, descr, author, column } = this.props.task;

			let obj = {
				title: title,
				descr: descr,
				comment: this.state.commentList,
				author: author,
				column: column
			};
			var updTaskSerial = JSON.stringify(obj);
			localStorage.setItem("updateTask", updTaskSerial);
			this.props.updateTask(); 
		}
		event.preventDefault();
	}

	render() {
		return (
			<div className={this.state.className} >
				<div className="overlay"></div>
				<div className="content">				
					<a href="#" className="btn__close" title="close" onClick={this.closePopup}>
						<i className="icon-cancel"></i>
					</a>

					<h2>
						<input className="content-text" 
							type="text" 
							value={this.props.task.title} 
							onChange={this.handleChangeTitle} 
							onFocus={this.onFocus} 
						/>
					</h2>

					<label>Description:</label>
					{ this.props.task.descr.length > 42 ?
						<textarea className="content-text" 
							rows="4" 
							value={this.props.task.descr} 
							onChange={this.handleChangeDescr} 
							onFocus={this.onFocus} >
						</textarea> :
						<textarea className="content-text" 
							rows="1" 
							value={this.props.task.descr} 
							onChange={this.handleChangeDescr} 
							onFocus={this.onFocus} >
						</textarea>
					}

					<label>Comments:</label>
					<textarea rows="2" 
						className="content-comment" 
						value={this.state.taskComment} 
						onChange={this.handleChangeComment} 
						placeholder="Add a new comment...">
					</textarea>
					<button className="comment-btn__add" onClick={this.addComment}>Add comment</button>
					<CommentList 
						comments={this.state.commentList} 
						deleteComment={this.deleteComment} 
						updateComment={this.updateComment}
					/>
						
					<div className="content-info">
						<span>Author: </span>{this.props.task.author}
					</div>
					<div className="content-info">
						<span>Column: </span>{this.props.currentColumnTitle}
					</div>

					{this.state.isEdited ? 
						<div>
							<a href="#" className="btn__save" title="save" onClick={this.handleSubmit}>
								<i className="icon-floppy"></i>
							</a>
							<a href="#" className="btn__delete" title="delete" onClick={this.handleDeleteTaskClick}>
								<i className="icon-trash-empty"></i>
							</a>
						</div> : 
						<div>
							<a href="#" className="btn__delete" title="delete" onClick={this.handleDeleteTaskClick}>
								<i className="icon-trash-empty"></i>
							</a>
						</div>
					}	
				</div>
			</div>
		);
	}
}

DetailTaskPopup.propTypes = {
	task: PropTypes.object,
	handleChangeStateButton: PropTypes.func,
	currentColumnTitle: PropTypes.string,
	deleteTask: PropTypes.func,
	updateTask: PropTypes.func
};