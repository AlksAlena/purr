import React, { Component } from "react";
import ButtonSave from "./ButtonSave";
import ButtonCancel from "./ButtonCancel";

export default class EditTaskPopup extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="overlay"></div>
				<div className="create-task">
					<div className="task_edit">
						<h3>Edit task</h3>
						<label for="task">Enter title of task</label>
						<input type="text" id="task" name="task" />
						<label for="comment">Enter comment or description</label>
						<textarea rows="5" id="comment" name="comment"></textarea>
						<p>Column: TODO</p>
						<p>Author: Vasya</p>
						<ButtonSave />
						<ButtonCancel />
					</div>

				</div>
			</div>
		);
	}
}