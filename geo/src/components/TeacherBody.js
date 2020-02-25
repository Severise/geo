import React, { Component } from 'react';
import show from './TeacherBodyJs.js';
import axios from 'axios';
import {Link } from 'react-router-dom';



export default class TeacherBody extends Component {

	constructor(props) {
		super(props);
		this.state = {
			students: [],
			user:this.props.user
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		console.log(this.state.user)
	}

	handleSubmit(event) {
		//send teacher id
		axios.get(`/classes`)
			.then(res => {
				this.setState({ students: res.data });
			}).catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<div id="body">
				<div id="content">
					<Link to={{pathname:'/classes', state:{user:this.state.user}}} className="button" user={this.state.user}>Просмотреть классы</Link>
					<button onClick={show}>Создать класс</button>
				</div>
				<div id="side">
					<form action="/regstudents" method="post" id="show" style={{display: 'none'}}>
						<ul>
							<li>
								<label htmlFor="class">Класс</label>
								<input type="text" name="class"/>
							</li>
							<li>
								<label htmlFor="students">Список студентов</label>
								<textarea name="students" cols="30" rows="10"></textarea>
							</li>
							<li><button type="submit">Создать</button></li>
						</ul>
					</form>
				</div>
			</div>
		);
	}
}