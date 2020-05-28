import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Head from '../components/Head.js'


export default class Home extends Component {
	constructor(props) {
		super(props);
		console.log(this)

	}
	render() {
		return (
			<div>
				<Head/>
				<div id="body">
					<div id="content">
						<h1>О проекте</h1>
						<div>Данное приложение создано для изучения географии Иркутской области. Здесь можно изучить области, города, реки и природные места. Обучение и проверка доступна любым желающим, а учителя могут зарегистрировать себя и свой класс и проверять знания учеников.
						</div>
					</div>
					<div id="side">
						<div>
						<h4>Учителям</h4>
						Если вы учитель, вы можете зарегистрироваться <Link to='/login'>здесь</Link> или войти <Link to='/login'>здесь</Link>. На странице профиля вы сможете добавить свой класс.</div>
						<div>
						<h4>Ученикам</h4>
						Если вы ученик, то вы можете войти <Link to='/login'>здесь</Link>. На своей странице вы сможете увидеть результаты своих тестов.</div>
					</div>
				</div>
			</div>
			);
	}
}