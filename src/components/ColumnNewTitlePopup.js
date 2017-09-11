import React, { Component } from "react";

export default class ColumnNewTitlePopup  extends Component {
	constructor(props) {
		super(props);
		this.closePopup = this.closePopup.bind(this);
		this.editColumnTitle = this.editColumnTitle.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			className: "columnNewTitle",
			title: ""
		}
	}

	closePopup() {
		// for hide the NewTaskPopup we use special
		// css-rule .hidden { display: none }, which is
		// added to the current css-class 
		let oldClass = this.state.className;
		let needClass = [oldClass, "hidden"];
		let newClass = needClass.join(" ");
		this.setState({ className: newClass });
	}

	handleChange(event) {
		this.setState({title: event.target.value});
	}

	handleSubmit(event) {
		this.editColumnTitle();
		this.closePopup();
		event.preventDefault();
	}

	editColumnTitle() {
		if(this.state.title) {
			localStorage.setItem("columnNewTitle", this.state.title);
		} else {
			localStorage.setItem("columnNewTitle", this.props.title);
		}		
		this.props.editTitle();
	}

	render() {
		return (
			<div className={this.state.className}>
				<div className="overlay"></div>
				<div className="content">
					<form onSubmit={this.handleSubmit} >
						<h3>Edit title</h3>
						<input type="text" value={this.state.title} onChange={this.handleChange} />
						<input type="submit" value="Save" />
						<input type="button" value="Cancel" onClick={this.closePopup} />
					</form>
				</div>
			</div>
		);
	}
}