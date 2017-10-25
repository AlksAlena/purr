import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addNewUser, closePopup } from "../actions";

class NewUserPopup extends Component {
	constructor(props) {
		super(props);
		this.handleClosePopup = this.handleClosePopup.bind(this);
		this.state = {
			author: ""
		};
	}

	handleClosePopup() {
		this.props.closePopup(this.props.id);
	}

	handleSetAuthor(event) {
		this.setState({author: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.addNewUser(this.state.author);
		this.setState({
			author: ""
		});
		this.props.closePopup(this.props.id);
	}

	render() {
		return (
			<div className="newUserPopup">
				<div className="overlay"></div>
				<div className="content">
					<form onSubmit={this.handleSubmit.bind(this)}>
						<h2>What is your name?</h2>
						<input 
							type="text" 
							name="userName" 
							value={this.state.author}
							onChange={this.handleSetAuthor.bind(this)} 
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

const mapStateToProps = (state) => {
	return {
		popups: state.popupsReducer,
		id: 'newUser'
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		addNewUser: bindActionCreators(addNewUser, dispatch),
		closePopup: bindActionCreators(closePopup, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUserPopup)