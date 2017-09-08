import React, { Component } from "react";
import ButtonSave from "./ButtonSave";
import ButtonCancel from "./ButtonCancel";

export default class NewTaskPopup extends Component {
	constructor(props) {
		super(props);
		this.addTask = this.addTask.bind(this);
		this.closePopup = this.closePopup.bind(this);
		this.state = {
			className: "newTaskPopup"
		};
	}

	addTask() {
		this.props.add();
	}

	closePopup() {
		let oldClass = this.state.className;
		let needClass = [oldClass, "hidden"];
		let newClass = needClass.join(" ");
		this.setState({ className: newClass });
	}

	render() {
		return (
			<div className={this.state.className}>
				<div className="overlay"></div>
				<div className="create-task">
					<div className="task_edit">
						<h3>Create new task</h3>
						<label for="task">Enter title of task</label>
						<input type="text" id="task" name="task" />
						<label for="comment">Enter comment or description</label>
						<textarea rows="5" id="comment" name="comment"></textarea>
						<ButtonSave add={this.addTask} hidden={this.closePopup}/>
						<ButtonCancel hidden={this.closePopup} />
					</div>

				</div>
			</div>
		);
	}
}