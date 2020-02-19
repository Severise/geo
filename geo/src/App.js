import React, { Component } from 'react';
// import { Route } from 'react-router';
import Home from './pages/Home';
// import Login from './pages/Login';
// import Teacher from './pages/Teacher';
// import Learn from './pages/Learn';
// import Test from './pages/Test';
// import Student from './pages/Student';
// import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';


export default class App extends Component {
	render() {
		return (
			<Home />
		);
	}
}