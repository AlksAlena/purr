import React, { Component } from "react";
import PropTypes from "prop-types"; 
import classNames from "classnames";

export default class ColumnNewTitlePopup  extends Component {
	constructor(props) {
		super(props);
		this.closePopup = this.closePopup.bind(this);
		this.handleButtonEscape = this.handleButtonEscape.bind(this);
		this.editColumnTitle = this.editColumnTitle.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			className: "columnNewTitle",
			title: ""
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

	handleChange(event) {
		this.setState({title: event.target.value});
	}

	handleSubmit(event) {
		this.editColumnTitle();
		this.closePopup();
		event.preventDefault();
	}

	editColumnTitle() {
		const { initColumnTitle, customColumnTitle, editColumnTitle } = this.props;
		this.state.title ?
			localStorage.setItem(`columnTitle${initColumnTitle}`, this.state.title) :
			localStorage.setItem(`columnTitle${initColumnTitle}`, customColumnTitle);
		editColumnTitle();
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

						<h2>Edit title</h2>
						<label>Enter new title of the task</label>
						<input type="text" value={this.state.title} onChange={this.handleChange} autoFocus={true} />
						<input type="submit" value="Save" />
					</form>
				</div>
			</div>
		);
	}
}

ColumnNewTitlePopup.propTypes = {
	handleChangeStateButton: PropTypes.func,
	editColumnTitle: PropTypes.func,
	customColumnTitle: PropTypes.string,
	initColumnTitle: PropTypes.string

};