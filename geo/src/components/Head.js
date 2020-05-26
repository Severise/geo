import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';
// import history from '../history.js'

export default class Head extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {}
		};
		var user = localStorage.token ? jwt_decode(localStorage.token) : {};
		this.state.user = user;
		this.logout = this.logout.bind(this);
	}

	logout(props) {
		localStorage.clear("token");
	}
	render() {
		return (
			<div id="head">
				<div id="nav">
					<ul>
						<li><NavLink exact to="">О сайте</NavLink></li>
						<li><NavLink exact to="/learn">Обучение</NavLink></li>
						<li><NavLink exact to={{
				pathname: "/test",
				state: this.state
			}}>Тестирование</NavLink></li>
						<li><NavLink exact to="/login">Вход</NavLink></li>
						<li><NavLink exact to="/login" onClick={this.logout}>Выход</NavLink></li>
					</ul>
				</div>
			</div>
			);
	}
}
// {isLoggedIn ? (
//        <LogoutButton onClick={this.handleLogoutClick} />
//      ) : (
//        <LoginButton onClick={this.handleLoginClick} />
//      )}