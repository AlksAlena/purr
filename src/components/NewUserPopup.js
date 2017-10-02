import React, { Component } from "react";
import PropTypes from "prop-types"; 
import classNames from "classnames";

export default class NewUserPopup  extends Component {
	constructor(props) {
		super(props);
		this.closePopup = this.closePopup.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = { 
			author: "",
			className: "newUserPopup"
		};
	}

	closePopup() {
		const classes = classNames(this.state.className, "hidden");
		this.setState({ className: classes });
	}

	handleChange(event) {
		this.setState({author: event.target.value});
	}

	handleSubmit(event) {
		localStorage.setItem("author", this.state.author );
		this.props.setNewAuthor();
		this.closePopup();
		event.preventDefault();
	}

	render() {
		return (
			<div className={this.state.className}>
				<div className="overlay"></div>
				<div className="content">
					<form onSubmit={this.handleSubmit} >
						<h2>What is your name?</h2>
						<input 
							type="text" 
							name="userName" 
							value={this.state.author} 
							onChange={this.handleChange} 
							autoFocus={true} 
							required 
						/>
						<input type="submit" value="Save" />
					</form>
				</div>
			</div>
		);
	}
}

NewUserPopup.propTypes = {
	setNewAuthor: PropTypes.func
};