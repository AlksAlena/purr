import React, { Component } from "react";
import DetailTaskPopup from "./DetailTaskPopup";

export default class Task extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
		this.state = {
			isDetail: false,
			isUpdate: false
		};	
	}

	update() {
		localStorage.setItem(`updIndex${this.props.initColumnTitle}`, this.props.index);
		console.log(`create updIndex${this.props.initColumnTitle}`);
		this.props.upd();
	}

	delete() {
		localStorage.setItem(`delIndex${this.props.initColumnTitle}`, this.props.index);
		console.log(`create delIndex${this.props.initColumnTitle}`);
		this.props.del();
	}

	handleClick() {
		if (this.state.isDetail) {
			this.setState({ isDetail: false });
		} else {
			this.setState({ isDetail: true });
		}	
	}

	render() {
		const divStyle = {
			backgroundColor: "rgba(32, 178, 170, 0.5)"
		};
		if(this.state.isDetail) {
			return (
				<div>
					<div className="task" style={divStyle} onClick={this.handleClick} >
						<p>{this.props.task.title}</p>
					</div>
					<DetailTaskPopup task={this.props.task} parent={this} currentColumnTitle={this.props.currentColumnTitle}/>
				</div>
			);
		} else {
			return (
				<div className="task" onClick={this.handleClick} >
					<p>{this.props.task.title}</p>
				</div>
			);
		}
		
	}
}