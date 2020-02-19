import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Teacher from './pages/Teacher';
import Learn from './pages/Learn';
import Test from './pages/Test';
import Student from './pages/Student';
import Classes from './pages/Classes';
import { Switch, Route } from 'react-router-dom';
import './App.css';


const Routes = () => (
    <Switch>
		<Route exact path='/' component={Home}></Route>
		<Route exact path='/learn' component={Learn}></Route>
		<Route exact path='/test' component={Test}></Route>
		<Route exact path='/login' component={Login}></Route>
		<Route exact path='/teacher' component={Teacher}></Route>
		<Route exact path='/student' component={Student}></Route>
		<Route exact path='/classes' component={Classes}></Route>
	</Switch>
);
export default Routes;