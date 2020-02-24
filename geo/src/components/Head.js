import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class Head extends Component {
	render() {
		return (
			<div id="head">
				<div id="nav">
					<ul>
						<li><NavLink exact to='/learn'>learn</NavLink></li>
						<li><NavLink exact to="/test">test</NavLink></li>
						<li><NavLink exact to="/login">login</NavLink></li>
						<li><NavLink exact to="/teacher">teachers</NavLink></li>
						<li><NavLink exact to="/student">students</NavLink></li>
					</ul>
				</div>
			</div>
		);
	}
}