import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closePopup } from '../reducers/popups';
import { setNewTitleColumn } from '../reducers/columns';

class NewTitleColumnPopup extends Component {
	constructor(props) {
		super(props);
		this.handleButtonEscape = this.handleButtonEscape.bind(this);
		this.handleClosePopup = this.handleClosePopup.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSetNewTitle = this.handleSetNewTitle.bind(this);
		this.state = {
			title: ''
		};
	}

	componentDidMount() {
		document.body.addEventListener('keydown', this.handleButtonEscape);
	}

	componentWillUnmount() {
		document.body.removeEventListener('keydown', this.handleButtonEscape);
	}

	handleClosePopup() {
		this.props.closePopup(this.props.id);
	}

	handleButtonEscape() {
		if (event.keyCode == 27) {
			this.props.closePopup(this.props.id);
		}
	}

	handleSetNewTitle(event) {
		this.setState({title: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.setNewTitleColumn(
			this.props.popups.newTitleColumnPopup.column, 
			this.props.popups.newTitleColumnPopup.prevTitle, 
			this.state.title
		);
		this.setState({
			title: ''
		});
		this.props.closePopup(this.props.id);
	}

	render() {
		return (
			<div className="newTitleColumnPopup">
				<div className="overlay"></div>
				<div className="content">
					<form onSubmit={this.handleSubmit} >
						<a href="#" className="btn__close" title="close" onClick={this.handleClosePopup}>
							<i className="icon-cancel"></i>
						</a>

						<h2>Edit title</h2>
						<label>Enter new title of the task</label>
						<input 
							type="text" 
							value={this.state.title} 
							onChange={this.handleSetNewTitle} 
							autoFocus
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
		id: 'newTitleColumn'
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		setNewTitleColumn,
		closePopup
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTitleColumnPopup)