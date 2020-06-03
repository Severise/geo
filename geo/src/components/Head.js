import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';
import UserMenu from '../components/UserMenu.js'

export default class Head extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {}
		};
		var user = localStorage.token ? jwt_decode(localStorage.token) : {};
		this.state.user = user;
	}

	render() {
		return (
			<div id="head">
				<div id="nav">
					<ul>
						<li><NavLink exact to="" activeClassName="current">О сайте</NavLink></li>
						<li><NavLink exact to="/learn" activeClassName="current">Обучение</NavLink></li>
						<li><NavLink exact to={{
				pathname: "/test",
				state: this.state
			}} activeClassName="current">Тестирование</NavLink></li>
			 			<li><UserMenu user={this.state.user}/></li>
					</ul>
				</div>
			</div>
			);
	}
}
