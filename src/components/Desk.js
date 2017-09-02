import React, { Component } from "react";
import ReactDOM from "react-dom";
import Column from "./Column";

export default class Desk extends Component {
	render() {
		return (
			<div className="clearfix">
				<Column title="TODO" tasks={["eat ","food "]}/>
				<Column title="In Progress" tasks={["cactus "]}/>
				<Column title="Test" tasks={["flower ","paper "]}/>
				<Column title="Done" tasks={["sleep "]}/>
			</div>
		);
	}
}