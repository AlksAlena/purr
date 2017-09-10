import React, { Component } from "react";
import ButtonSave from "./ButtonSave";
import ButtonCancel from "./ButtonCancel";

export default class NewTaskPopup extends Component {
	constructor(props) {
		super(props);
		this.addTask = this.addTask.bind(this);
		this.closePopup = this.closePopup.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.state = {
			className: "newTaskPopup"
		};
	}

	addTask() {
		// сначала сохранить ввод пользователя, потом 
		// вызвать родительскую addTask()
		/*
		let obj = {
		title: "Tomorrow",
		descr: "Buy oreo cookies",
		author: appStorage.getItem("author")
		};
		console.log(obj);
		// сериализация объекта и его добавление в хранилище
		var newTaskSerial = JSON.stringify(obj);
		appStorage.setItem("task", newTaskSerial);
		*/
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

	handleInput(event) {
		console.log(event.target.value);
	}

	render() {
		return (
			<div className={this.state.className}>
				<div className="overlay"></div>
				<div className="create-task">
					<div className="task_edit">
						<h3>Create new task</h3>
						<label for="task">Enter title of task</label>
						<input type="text" id="task" name="task" onInput={this.handleInput} />
						<label for="descr">Enter description</label>
						<textarea rows="3" id="describe" name="describe" onInput={this.handleInput}></textarea>
						<label for="comment">Enter comment</label>
						<textarea rows="3" id="comment" name="comment" onInput={this.handleInput}></textarea>
						<ButtonSave add={this.addTask} hidden={this.closePopup}/>
						<ButtonCancel hidden={this.closePopup} />
					</div>

				</div>
			</div>
		);
	}
}