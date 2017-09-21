import React, { Component } from "react";
import PropTypes from "prop-types"; 

export default class NewTaskPopup extends Component {
	constructor(props) {
		super(props);
		this.addTask = this.addTask.bind(this);
		this.closePopup = this.closePopup.bind(this);
		this.escClosePopup = this.escClosePopup.bind(this);
		this.handleSetTitle = this.handleSetTitle.bind(this);
		this.handleSetDescr = this.handleSetDescr.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			className: "newTaskPopup",
			taskTitle: "",
			taskDescr: ""
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
		let button = this.props.button;
		button.setState({ isPress: false});
	}

	escClosePopup() { // press Escape key
		if (event.keyCode == 27) {
			this.closePopup();
		}
	}

	addTask() {// save custom input as new task
		let appStorage = localStorage;

		let obj = {
			title: this.state.taskTitle,
			descr: this.state.taskDescr ? this.state.taskDescr : "-",
			comment: [],
			author: appStorage.getItem("author"),
			column: this.props.colTitle
		};
		console.log(obj);
		
		// serialize object and upload in localStorage
		var newTaskSerial = JSON.stringify(obj);
		appStorage.setItem("task", newTaskSerial);

		this.props.add();
	}

	handleSetTitle(event) {
		this.setState({taskTitle: event.target.value});
	}

	handleSetDescr(event) {
		this.setState({taskDescr: event.target.value});
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
						<a href="#" className="btn__close" title="close" onClick={this.closePopup}>
							<i className="icon-cancel"></i>
						</a>

						<h2>Create a new task</h2>
						<label for="taskTitle">Enter title of task</label>
						<input type="text" value={this.state.taskTitle} onChange={this.handleSetTitle} autoFocus={true} required />
						<label for="descr">Enter description</label>
						<textarea rows="3" value={this.state.taskDescr} onChange={this.handleSetDescr} ></textarea>
						<input type="submit" value="Save" />
					</form>
				</div>
			</div>
		);
	}
}

NewTaskPopup.propTypes = {
	add: PropTypes.func,
	button: PropTypes.object,
	colTitle: PropTypes.string,
};