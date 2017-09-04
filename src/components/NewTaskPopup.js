import React, { Component } from "react";
import ButtonSave from "./ButtonSave";
import ButtonCancel from "./ButtonCancel";

export default class NewTaskPopup extends Component {
	constructor(props) {
		super(props);
		this.msg = this.msg.bind(this);
		this.addTask = this.addTask.bind(this);
	}

	msg() {
		this.props.msg();
	}

	addTask() {
		this.props.add();
	}

	render() {
		return (
			<div>
				<div className="overlay"></div>
				<div className="create-task">
					<div className="task_edit">
						<h3>Create new task</h3>
						<label for="task">Enter title of task</label>
						<input type="text" id="task" name="task" />
						<label for="comment">Enter comment or description</label>
						<textarea rows="5" id="comment" name="comment"></textarea>
						<ButtonSave msg={this.msg} add={this.addTask} />
						<ButtonCancel msg={this.msg} />
					</div>

				</div>
			</div>
		);
	}
}