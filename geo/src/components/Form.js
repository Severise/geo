import React, { Component } from 'react';
import axios from 'axios';


export default class Sign extends Component {
	constructor(props) {
		super(props);

		this.state = {
			login: "",
			password: "",
			role: "",
			loginErrors: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit(event) {
		const { login, password, role } = this.state;
		console.log({ login, password, role });
		axios
			.post("/login", {
				user: {
					login: login,
					password: password,
					role: role
				}
			}, { withCredentials: true })
			.then(response => {
				if (response.data.logged_in) {
					this.props.handleSuccessfulAuth(response.data);
				}
			})
			.catch(error => {
				console.log("login error", error);
			});
		event.preventDefault();
	}

	render() {
		return (
			<div id="sign">
				  <label>Введите данные для входа</label>
					<form  onSubmit={this.handleSubmit} >
						<ul>
							<li><label htmlFor="login">Имя</label>
								<input type="text" name="login" value={this.state.login} onChange={this.handleChange}/></li>
							<li><label htmlFor="password">Пароль</label>
								<input type="password" name="password" value={this.state.password} onChange={this.handleChange}/></li>
								<label>Роль</label>
							<li id="radio"><input type="radio" id="teach" name="role" value="teacher" onChange={this.handleChange}/>
								<label htmlFor="teach">Учитель</label>
								<input type="radio"/>
								<label> / </label>
								<input type="radio" id="stud" name="role"  value="student" onChange={this.handleChange}/>
								<label htmlFor="stud">Ученик</label></li>
							<li><button type="submit">Войти</button></li>
						</ul>
					</form>
			</div>
		);
	}
}