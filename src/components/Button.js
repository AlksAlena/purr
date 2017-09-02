import React, { Component } from "react";
import ReactDOM from "react-dom";
import NewTask from "./NewTask";

export default class Button extends Component {
	constructor(props) {
		super(props);
		this.state = { isPress: "nopress" };
	}

	render() {
		
		const onClick = () => {
			if (this.state.isPress === "press") {
				this.setState({ isPress: "nopress" });
			} else {
				this.setState({ isPress: "press" });
			}
				
		};

		console.log("create");

		return (
			<div>
				<input type="submit" className="button-create" value="Add task" onClick={onClick} />
			</div>
		);
	}
}