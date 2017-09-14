import React, { Component } from "react";

export default class DetailTaskPopup extends Component {
	constructor(props) {
		super(props);
		this.closePopup = this.closePopup.bind(this);
		this.escClosePopup = this.escClosePopup.bind(this);
		this.handleDelClick = this.handleDelClick.bind(this);
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangeDescr = this.handleChangeDescr.bind(this);
		this.handleChangeComment = this.handleChangeComment.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.state = {
			className: "detailTaskPopup",
			taskTitle: "",
			taskDescr: "",
			taskComment: "",
			isEdited: false,
			isEditedTitle: false,
			isEditedDescr: false,
			isEditedComment: false
		};
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
		parent.setState({ isDetail: false});
	}

	escClosePopup() { // press Escape key
		if (event.keyCode == 27) {
			this.closePopup();
		}
	}

	handleChangeTitle(event) {
		// reaction on enter text
		this.setState({taskTitle: event.target.value});
		// show exist text in input taskObject not component
		this.props.task.title = event.target.value;
	}

	handleChangeDescr(event) {
		this.setState({taskDescr: event.target.value});
		this.props.task.descr = event.target.value;
	}

	handleChangeComment(event) {
		this.setState({taskComment: event.target.value});
		this.props.task.comment = event.target.value;
	}

	handleSubmit(event) {
		if(this.state.isEdited) {
			console.log("the object has been changed");
			// save changes in new object
			let obj = {
				title: this.props.task.title,
				descr: this.props.task.descr,
				comment: this.props.task.comment,
				author: this.props.task.author,
				column: this.props.task.column
			};
			// serialize object and upload in localStorage
			var updTaskSerial = JSON.stringify(obj);
			localStorage.setItem("updTask", updTaskSerial);
			this.props.parent.update(); 
		}
		this.closePopup();
		event.preventDefault();
	}

	handleDelClick() {
		this.props.parent.delete();
		this.closePopup();
	}

	onFocus() {
		this.setState({ isEdited: true });
	}

	render() {
		return (
			<div className={this.state.className} >
				<div className="overlay"></div>
				<div className="content">					
					<form onSubmit={this.handleSubmit} >
						<a href="#" onClick={this.closePopup}><i className="icon-cancel"></i></a>
						<h3>Detail of task</h3>

						<label>Title:</label>
						<input className="content-text" 
							type="text" 
							value={this.props.task.title} 
							onChange={this.handleChangeTitle} 
							onFocus={this.onFocus} 
							onBlur={this.onBlur}
						/>
						<label>Description:</label>
						<textarea className="content-text" 
							rows="3" 
							value={this.props.task.descr} 
							onChange={this.handleChangeDescr} 
							onFocus={this.onFocus} >
						</textarea>
						<label>Comment:</label>
						<textarea className="content-text" 
							rows="3" 
							value={this.props.task.comment} 
							onChange={this.handleChangeComment} >
						</textarea> : 
						
						<div className="info"><span>Author: </span>{this.props.task.author}</div>
						<div className="info"><span>Column: </span>{this.props.currentColumnTitle}</div>
						{this.state.isEdited ? 
							<div>
								<input type="submit" value="Save" />
								<input type="button" value="Delete" onClick={this.handleDelClick} />
							</div> : 
							<div>
								<input type="button" value="Delete" onClick={this.handleDelClick} />
							</div>
						}						
					</form>
				</div>
			</div>
		);
	}
}
