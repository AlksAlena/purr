import React, { Component } from "react";

export default class NewTaskPopup extends Component {
	constructor(props) {
		super(props);
		this.addTask = this.addTask.bind(this);
		this.closePopup = this.closePopup.bind(this);
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangeDescr = this.handleChangeDescr.bind(this);
		this.handleChangeComment = this.handleChangeComment.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			className: "newTaskPopup",
			taskTitle: "",
			taskDescr: "",
			taskComment: ""
		};
	}

	addTask() {// save custom input as new task
		let appStorage = localStorage;

		let obj = {
		title: this.state.taskTitle,
		descr: this.state.taskDescr,
		comment: this.state.taskComment,
		author: appStorage.getItem("author")
		};
		console.log(obj);
		
		// serialize object and upload in localStorage
		var newTaskSerial = JSON.stringify(obj);
		appStorage.setItem("task", newTaskSerial);

		this.props.add();
	}

	closePopup() {
		// for hide the NewTaskPopup we use special
		// css-rule .hidden { display: none }, which is
		// added to the current css-class 
		let oldClass = this.state.className;
		let needClass = [oldClass, "hidden"];
		let newClass = needClass.join(" ");
		this.setState({ className: newClass });
		// button causing the NewTaskPopup
		// after closePopup() state of button should be false
		let button = this.props.button;
		button.setState({ isPress: false});
	}

	handleChangeTitle(event) {
		this.setState({taskTitle: event.target.value});
	}

	handleChangeDescr(event) {
		this.setState({taskDescr: event.target.value});
	}

	handleChangeComment(event) {
		this.setState({taskComment: event.target.value});
	}

	handleSubmit(event) {
		this.addTask();
		this.closePopup();
		event.preventDefault();
	}

	render() {
		return (
			<div className={this.state.className}>
				<div className="overlay"></div>
				<div className="content">
					<form onSubmit={this.handleSubmit}>
						<h3>Create new task</h3>
						<label for="taskTitle">Enter title of task</label>
						<input type="text" id="taskTitle" name="taskTitle" value={this.state.taskTitle} onChange={this.handleChangeTitle} required />
						<label for="descr">Enter description</label>
						<textarea rows="3" id="describe" name="describe" value={this.state.taskDescr} onChange={this.handleChangeDescr} ></textarea>
						<label for="comment">Enter comment</label>
						<textarea rows="3" id="comment" name="comment" value={this.state.taskComment} onChange={this.handleChangeComment} ></textarea>
						<input type="submit" value="Save" />
						<input type="button" value="Cancel" onClick={this.closePopup} />
					</form>
				</div>
			</div>
		);
	}
}