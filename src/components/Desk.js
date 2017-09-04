import React, { Component } from "react";
import Column from "./Column";

export default class Desk extends Component {
	render() {
		return (
			<div className="app-content clearfix">
				<Column title="TODO" tasks={["eat ","food "]}/>
				<Column title="In Progress" tasks={["cactus "]}/>
				<Column title="Testing" tasks={["flower ","paper "]}/>
				<Column title="Done" tasks={["sleep "]}/>
			</div>
		);
	}
}