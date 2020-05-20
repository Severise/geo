import React, { Component } from 'react';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';

export default class Sign extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: "",
			password: "",
			role: "teacher",
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
		if (this.state.role === '') {
			this.setState({
				loginError: "Выберите роль"
			});
			return;
		}
		axios
			.post("login", {
				login: this.state.login,
				password: this.state.password,
				role: this.state.role
			})
			.then(res => {
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
			})
			.catch(error => {
				this.setState({
					loginError: "User not found"
				});
			});
	}

	render() {
		return (
			<div id="form">
                    <input type="radio" id="signform" name="form" value="" defaultChecked />
                    <label htmlFor="signform">Вход</label>
                    <div id="sign">
                        <label>Введите данные для входа</label>
                        <div className="error">{this.state.loginError}</div>
                        <form onSubmit={this.handleSubmit}>
                            <ul>
                                <li><label htmlFor="login">Имя</label>
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
                    <input type="radio" id="regform" name="form" value=""/>
                    <label htmlFor="regform">Регистрация</label>
                <div id="reg">
                    <label>Введите данные</label>
                    <div className="error">{this.state.loginError}</div>
                    <form  onSubmit={this.handleSubmit}>
                        <ul>
                            <li><label htmlFor="name">Имя</label>
                                <input type="text" name="lo gin" value={this.state.name} onChange={this.handleChange}/></li> 
                            <li><label htmlFor="login">Имя</label>
                                <input type="text" name="login" value={this.state.login} onChange={this.handleChange}/></li>
                            <li><label htmlFor="password">Пароль</label>
                                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/></li>
                            <li><label htmlFor="school">Школа</label>
                                <input type="text" name="school" value={this.state.school} onChange={this.handleChange}/></li>
                                
                            <li><button type="submit">Зарегистрироваться</button></li>
                        </ul>
                    </form>
                </div>
            </div>
			);
	}
}