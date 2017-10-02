import React, { Component } from "react";
import PropTypes from "prop-types"; 
import classNames from "classnames";

export default class NewTaskPopup extends Component {
	constructor(props) {
		super(props);
		this.addTask = this.addTask.bind(this);
		this.closePopup = this.closePopup.bind(this);
		this.handleButtonEscape = this.handleButtonEscape.bind(this);
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

	addTask() {
		let obj = {
			title: this.state.taskTitle,
			descr: this.state.taskDescr ? this.state.taskDescr : "-",
			comment: [],
			author: localStorage.getItem("author"),
			column: this.props.columnTitle
		};
		var newTaskSerial = JSON.stringify(obj);
		localStorage.setItem("task", newTaskSerial);
		this.props.addTask();
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
	addTask: PropTypes.func,
	handleChangeStateButton: PropTypes.func,
	columnTitle: PropTypes.string,
};