import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Head from '../components/Head.js'

export default class Student extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.location.state.user
		}
		console.log(this.state)
	}
	render() {
		return (
			<div>
				<Head/>
				<div id="body">
					<div id="content">
						<h3>Функции</h3>
						TELL THAT ONLY FIRST ATTEMPT WILL COUNT AND FUTHER TRIES ARE USELESS
						<div>
							<button className="class" onClick={this.select}>Создать класс</button>
							<button className="stud" onClick={this.showLast}>Показать последние результаты</button>
							<Link to={{
				pathname: '/students',
				state: {
					user: this.state.user
				}
			}} className="button" user={this.state.user}>Просмотреть класы</Link>
						</div>
			 		</div>
					<div id="side">
				</div>
			</div>
		</div>
			);
	}
}