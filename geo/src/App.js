import React, { Component } from 'react';
import Home from './pages/Home';
import Head from './components/Head';
import axios from 'axios';
import Routes from './Routes';
import history from './history.js'
import './App.css';


export default class App extends Component {
	render() {
		return (
			<div>
			<Head/>
			<Routes/>
			</div>

			);
	}
}