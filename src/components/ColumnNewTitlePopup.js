import React, { Component } from "react";

export default class ColumnNewTitlePopup  extends Component {
	constructor(props) {
		super(props);
		this.closePopup = this.closePopup.bind(this);
		this.escClosePopup = this.escClosePopup.bind(this);
		this.editColumnTitle = this.editColumnTitle.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			className: "columnNewTitle",
			title: ""
		}
	}

	componentDidMount() {
		document.body.addEventListener("keydown", this.escClosePopup);
	}

	componentWillUnmount() {
		document.body.removeEventListener("keydown", this.escClosePopup);
	}

	closePopup() {
		// for hide the NewTaskPopup we use special
		// css-rule .hidden { display: none }, which is
		// added to the current css-class 
		let oldClass = this.state.className;
		let needClass = [oldClass, "hidden"];
		let newClass = needClass.join(" ");
		this.setState({ className: newClass });
		// button causing the popup
		// after closePopup() state of button should be false
		let parent = this.props.parent;
		parent.setState({ isChangeTitle: false });
	}

	escClosePopup() { // press Escape key
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
		let parent = this.props.parent;
		// parent.props.title - initial title of the column 
		// parent.state.title - current title of the column (may be changed after init)
		// columnTitleTODO = "new value"
		this.state.title ?
			localStorage.setItem(`columnTitle${parent.props.title}`, this.state.title) :
			localStorage.setItem(`columnTitle${parent.props.title}`, parent.state.title);
		parent.editColumnTitle();
	}

	render() {
		return (
			<div className={this.state.className}>
				<div className="overlay"></div>
				<div className="content">
					<form onSubmit={this.handleSubmit} >
						<h3>Edit title</h3>
						<input type="text" value={this.state.title} onChange={this.handleChange} autoFocus={true} />
						<input type="submit" value="Save" />
						<input type="button" value="Cancel" onClick={this.closePopup} />
					</form>
				</div>
			</div>
		);
	}
}