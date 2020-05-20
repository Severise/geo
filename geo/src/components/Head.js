import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


export default class Head extends Component {
	constructor(props) {
		super(props);
	// console.log(this.props)
	}

	logout() {
		localStorage.clear("token");
		// console.log(this) 
		// this.props.histosry.push('/');
		return
	}
	render() {
		return (
			<div id="head">
				<div id="nav">
					<ul>
						<li><NavLink exact to=''>О сайте</NavLink></li>
						<li><NavLink exact to='/learn'>Обучение</NavLink></li>
						<li><NavLink exact to="/test">Тестирование</NavLink></li>
						<li><NavLink exact to="/login">Вход</NavLink></li>
						<li><NavLink exact to="/logout" onClick={this.logout}>Выход</NavLink></li>
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