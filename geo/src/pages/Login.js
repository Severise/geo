import React, { Component } from 'react';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';
import Head from '../components/Head.js'

export default class Sign extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: "",
			password: "",
			role: "teacher",
			schoolName: "",
			school: "",
			newSchool: "",
			name: "",
			status: "",
			schools: []
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		axios.get(`/schools`).then(res => {
			this.setState({
				schools: res.data
			});
		}).catch(error => {
			console.log(error);
		});
	}

	handleChange(event) {
		if (event.target.name === 'school') {
			this.setState({
				schoolname: event.target.value
			});
		}
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		var radio = document.getElementsByName('form');
		for (var i = 0; i < radio.length; i++) {
			if (radio[i].checked) {
				var path = radio[i].id;
			}
		}
		if (path === "signin") {
			axios.post(path, {
				login: this.state.login,
				password: this.state.password,
				role: this.state.role
			}).then(res => {
				localStorage.setItem('token', res.data);
				var token = jwt_decode(res.data);
				if (token.class) {
					this.props.history.push({
						pathname: `/student`,
						state: {
							user: token
						}
					});
				} else if (token.school) {
					this.props.history.push({
						pathname: `/teacher`,
						state: {
							user: token
						}
					});
				}
			}).catch(error => {
				this.setState({
					status: <div className="error">User not found</div>
				});
			});
		} else {
			axios.post(path, {
				name: this.state.name,
				login: this.state.login,
				password: this.state.password,
				school: this.state.school,
				newSchool: this.state.newSchool
			}).then(res => {
				if (res.data) {
					this.setState({
						status: <div className="success">Success registration</div>
					});
					this.setState({
						name: "",
						login: "",
						password: "",
						school: "",
						newSchool: ""
					});
					document.getElementById('signin').checked = true;
				} else {
					this.setState({
						status: <div className="error">Пользователь уже существует</div>
					});
				}
			}).catch(error => {
				this.setState({
					status: <div className="error">Registration error</div>
				});
			});
		}
	}

	render() {
		return (
			<div>
				<Head/>
				<div id="form">
						<input type="radio" id="signin" name="form" value="" defaultChecked />
						<label htmlFor="signin">Вход</label>
						<div id="sign">
							<label>Введите данные для входа</label>
							{this.state.status}
							<form onSubmit={this.handleSubmit}>
								<ul>
									<li><label htmlFor="login">Логин</label>
										<input type="text" name="login" value={this.state.login} onChange={this.handleChange} /></li>
									<li><label htmlFor="password">Пароль</label>
										<input type="password" name="password" value={this.state.password} onChange={this.handleChange}/></li>
										<label>Роль</label>
									<li className="radio"><input type="radio" id="teach" name="role" value="teacher" onChange={this.handleChange} defaultChecked />
										<label htmlFor="teach">Учитель</label>
										<input type="radio"/>
										<label> / </label>
										<input type="radio" id="stud" name="role"  value="student" onChange={this.handleChange}/>
										<label htmlFor="stud">Ученик</label></li>
									<li><button type="submit">Войти</button></li>
								</ul>
							</form>
						</div>  
						<label> / </label>
						<input type="radio" id="signup" name="form" value=""/>
						<label htmlFor="signup">Регистрация</label>
					<div id="reg">
						<label>Введите данные</label>
						{this.state.status}
						<form onSubmit={this.handleSubmit}>
							<ul>
								<li><label htmlFor="name">Имя</label>
									<input type="text" name="name" value={this.state.name} onChange={this.handleChange}/></li> 
								<li><label htmlFor="login">Логин</label>
									<input type="text" name="login"  autoComplete="off" value={this.state.login} onChange={this.handleChange}/></li>
								<li><label htmlFor="password">Пароль</label>
									<input type="password" name="password"  autoComplete="off" value={this.state.password} onChange={this.handleChange}/></li>
								
								<li>
									<label htmlFor="school">Школа</label>
									<select name="school" onChange={this.handleChange} >
									<option value=""></option>
										{this.state.schools.map(item => <option key={item.id} value={item.id}>{item.name}</option>)};
									</select>
								</li>
								<li><label htmlFor="newSchool">Новая школа</label>
									<input type="text" name="newSchool" value={this.state.newSchool} placeholder='Создайте новую если вашей нет в списке' onChange={this.handleChange}/></li>
								<li><button type="submit">Зарегистрироваться</button></li>
							</ul>
						</form>
					</div>
				</div>
			</div>
			);
	}
}