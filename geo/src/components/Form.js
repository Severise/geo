import React, { Component } from 'react';
import axios from 'axios';

export default class Sign extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: "",
			password: "",
			role: "",
			loginError: ""
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
		event.preventDefault();
		axios
			.post("login", {
				login: this.state.login,
				password: this.state.password,
				role: this.state.role
			})
			.then(res => {
				localStorage.setItem('usertoken', res.data.token)

				if (res && res.data.user.class)
					this.props.history.push(`/student`)
				else if (res && res.data.user.school)
					this.props.history.push(`/teacher`)
			})
			.catch(error => {
				this.setState({
					loginError: "User not found"
				});
			});
	}

	render() {
		return (
			<div id="sign">
				<label>Введите данные для входа</label>
				<div className="error">{this.state.loginError}</div>
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