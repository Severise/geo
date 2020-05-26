import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';

const PrivateRoute = ({component: Component, ...rest}) => (
	<Route {...rest} render={props => {

		if (!localStorage.token && !props.location.state) {
			return <Redirect to={{
					pathname: '/login'
				}} />
		}

		var user = props.location.state && props.location.state.user ? props.location.state.user : jwt_decode(localStorage.token);
		props.location.state={user: user};
		if (user.school) {
			if (props.location.pathname === '/teacher' || props.location.pathname === '/students'|| props.location.pathname === '/results') {
				return <Component {...props}/>
			}
			return <Redirect to={{
					pathname: '/teacher',
					state: {
						user: user
					}
				}} />
		}
		if (user.class) {
			if (props.location.pathname === '/student') {
				return <Component {...props} />
			}
			return <Redirect to={{
					pathname: '/student',
					state: {
						user: user
					}
				}} />
		}
	}}/>
)
export default PrivateRoute;