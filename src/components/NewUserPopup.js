import React, { Component } from "react";
import PropTypes from "prop-types"; 

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
		// for hide the NewTaskPopup we use special
		// css-rule .hidden { display: none }, which is
		// added to the current css-class 
		let oldClass = this.state.className;
		let needClass = [oldClass, "hidden"];
		let newClass = needClass.join(" ");
		this.setState({ className: newClass });
	}

	handleChange(event) {
		this.setState({author: event.target.value});
	}

	handleSubmit(event) {
		// save value in local storage
		localStorage.setItem("author", this.state.author );
		// set state in App component
		this.props.app.setState({ author: this.state.author });
		this.closePopup();
		event.preventDefault();
	}

	render() {
		return (
			<div className={this.state.className}>
				<div className="overlay"></div>
				<div className="content">
					<form onSubmit={this.handleSubmit} >
						<a href="#" className="btn__close" title="close" onClick={this.closePopup}>
							<i className="icon-cancel"></i>
						</a>

						<h2>What is your name?</h2>
						<input type="text" name="userName" value={this.state.author} onChange={this.handleChange} autoFocus={true} required />
						<input type="submit" value="Save" />
					</form>
				</div>
			</div>
		);
	}
}

NewUserPopup.propTypes = {
	app: PropTypes.object,
};