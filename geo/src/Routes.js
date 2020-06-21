import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Teacher from './pages/Teacher';
import Learn from './pages/Learn';
import Test from './pages/Test';
import Student from './pages/Student';
import Students from './pages/Students';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import './App.css';

const Routes = () => (
	<Switch>
		<Route exact path='/' component={Home}></Route>
		<Route exact path='/learn' component={Learn}></Route>
		<Route exact path='/test' component={Test}></Route>
		<Route exact path='/login' component={Login}></Route>
		<PrivateRoute exact path='/teacher' component={Teacher}></PrivateRoute>
		<PrivateRoute exact path='/student' component={Student}></PrivateRoute>
		<PrivateRoute exact path='/students' component={Students}></PrivateRoute>
		<PrivateRoute exact path='/results' component={Students}></PrivateRoute>
	</Switch>
);
export default Routes;