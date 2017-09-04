import React, { Component } from "react";

export default class Popup  extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="button">
				<div>
					<div className="overlay"></div>
					<div className="create-task">
						<div className="task_edit">
							<h3>{this.props.text}</h3>
						</div>

					</div>
				</div> 
			</div>
		);
	}
}