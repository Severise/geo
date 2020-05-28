import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router-dom";

function logout(props) {
	localStorage.clear("token");
}

export default withRouter(function UserMenu(props) {
	var path = props.history.location.pathname;
	if (props.user.id && (path === '/student' || path === '/teacher')) {
		return <NavLink exact to="/login" onClick={logout}>Выход</NavLink>;
	}
	if (props.user.school) {
		return <NavLink exact to="/teacher">Профиль</NavLink>;
	}
	if (props.user.class) {
		return <NavLink exact to="/student">Профиль</NavLink>;
	}
	return <NavLink exact to="/login">Вход</NavLink>;
})