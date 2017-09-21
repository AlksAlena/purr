import React, { Component } from "react";
import PropTypes from "prop-types"; 
import CommentList from "./CommentList";

export default class DetailTaskPopup extends Component {
	constructor(props) {
		super(props);
		this.closePopup = this.closePopup.bind(this);
		this.escClosePopup = this.escClosePopup.bind(this);
		this.handleDelTaskClick = this.handleDelTaskClick.bind(this);
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangeDescr = this.handleChangeDescr.bind(this);
		this.handleChangeComment = this.handleChangeComment.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.addComment = this.addComment.bind(this);
		this.updComment = this.updComment.bind(this);
		this.delComment = this.delComment.bind(this);
		this.state = {
			className: "detailTaskPopup",
			taskTitle: "",
			taskDescr: "",
			taskComment: "",
			isEdited: false, // any changes in the task
			commentList: this.props.task.comment // array of the comments in the task
		};
	}

	componentDidMount() {
		document.body.addEventListener("keydown", this.escClosePopup);
	}

	componentWillUnmount() {
		document.body.removeEventListener("keydown", this.escClosePopup);
	}

	closePopup() {
		// for hide the NewTaskPopup we use special
		// css-rule .hidden { display: none }, which is
		// added to the current css-class 
		let oldClass = this.state.className;
		let needClass = [oldClass, "hidden"];
		let newClass = needClass.join(" ");
		this.setState({ className: newClass });
		// button causing the popup
		// after closePopup() state of button should be false
		let parent = this.props.parent;
		parent.setState({ isDetail: false});
	}

	escClosePopup() { // press Escape key
		if (event.keyCode == 27) {
			this.closePopup();
		}
	}

	handleChangeTitle(event) {
		// reaction on enter text
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
		// if new comment not empty
		if(this.state.taskComment) {
			console.log("ok");
			let today = new Date();
			let now = today.getDate() + "-" + (today.getMonth() + 1) + 
				"-" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes();
			console.log("now: " + now);
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
		} else console.log("empty comment");
	}

	updComment() {
		let updIndex = localStorage.getItem("updCommentIndex");
		console.log("updCommentIndex: " + updIndex);
		let tmpCommentList = this.state.commentList;
		// get Obj from LS - parse comment in object
		let newComment = JSON.parse(localStorage.getItem("updComment"));
		tmpCommentList.splice(updIndex, 1, newComment);
		// set new state - rerender and remove used updIndex
		this.setState({ commentList: tmpCommentList });
		// remove used updIdex from LS
		localStorage.removeItem("updCommentIndex");
		localStorage.removeItem("updComment");
		this.setState({ isEdited: true });
	}

	delComment() {
		let delIndex = localStorage.getItem("delCommentIndex");
		console.log("delCommentIndex: " + delIndex);
		let tmpCommentList = this.state.commentList;
		tmpCommentList.splice(delIndex, 1);
		// set new state - rerender and remove used updIndex
		this.setState({ commentList: tmpCommentList });
		// remove used updIdex from LS
		localStorage.removeItem("delCommentIndex");
		this.setState({ isEdited: true });
	}

	// delete current task and close popup
	handleDelTaskClick() {
		this.props.parent.delete();
		this.closePopup();
	}

	onFocus() {
		this.setState({ isEdited: true });
	}

	handleSubmit(event) {
		if(this.state.isEdited) {
			console.log("the object has been changed");
			// save changes in the new object
			let obj = {
				title: this.props.task.title,
				descr: this.props.task.descr,
				comment: this.state.commentList,
				author: this.props.task.author,
				column: this.props.task.column
			};
			// serialize object and upload in localStorage
			var updTaskSerial = JSON.stringify(obj);
			localStorage.setItem("updTask", updTaskSerial);
			this.props.parent.update(); 
		}
		// this.closePopup();
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
					<CommentList comments={this.state.commentList} del={this.delComment} upd={this.updComment}/>
						
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
							<a href="#" className="btn__delete" title="delete" onClick={this.handleDelTaskClick}>
								<i className="icon-trash-empty"></i>
							</a>
						</div> : 
						<div>
							<a href="#" className="btn__delete" title="delete" onClick={this.handleDelTaskClick}>
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
	parent: PropTypes.object,
	currentColumnTitle: PropTypes.string,
};