import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Head from '../components/Head.js'

export default class Teacher extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.location.state.user,
			classes: [],
			students: '',
			data: [],
			letter: '',
			number: '',
			class: '',
			classValue: '',
			status: '',
			last: []
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.select = this.select.bind(this);
		this.showLast = this.showLast.bind(this);
		this.loadClasses = this.loadClasses.bind(this);
		this.loadClasses();
	}

	loadClasses() {
		axios.get(`/classes`).then(res => {
			this.setState({
				classes: res.data
			});
		}).catch(error => {
			console.log(error);
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		axios.post(`/regstudents`, {
			id: this.state.user.id,
			students: this.state.students,
			class: this.state.class,
			classValue: this.state.classValue
		}).then(res => {
			this.setState({
				data: res.data
			});
			this.setState({
				status: 'Добавлено ' + res.data.length + ' учеников:'
			}, this.show);
			this.setState({
				students: '',
				classValue: '',
				class: ''
			});
		}).catch(error => {
			console.log(error);
		});
	}

	handleCreate(event) {
		event.preventDefault();
		axios.post(`/createclass`, {
			id: this.state.user.id,
			number: this.state.number,
			letter: this.state.letter
		}).then(res => {
			this.setState({
				status: 'Создан класс: ' + res.data.number + ' ' + res.data.letter
			}, this.show);
			this.setState({
				letter: '',
				number: ''
			}, this.loadClasses);

		}).catch(error => {
			this.setState({
				status: ''
			});
			console.log(error);
		});
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
		if (event.target.getAttribute('name') === 'class') {
			this.setState({
				[event.target.name]: event.target.options[event.target.selectedIndex].value
			});
			this.setState({
				classValue: event.target.options[event.target.selectedIndex].innerText
			});
		}
	}

	showLast(event) {
		axios.get(`/results`, {
			params: {
				id: this.state.user.id,
				last: true
			}
		}).then(res => {
			this.setState({
				last: res.data,
				status: 'Последние результаты:',
				data: []
			}, this.show);
		}).catch(error => {
			console.log(error);
		});
	}

	select(event) {
		this.setState({
			status: '',
			data: [],
			last: []
		}, this.show(event))
	}

	show(event) {
		if (!event) {
			document.getElementById('createStud').style.display = 'none';
			document.getElementById('createClass').style.display = 'none';
			return;
		}
		var x = document.getElementById(event.target.className);
		var w = event.target.className === 'createClass' ? 'createStud' : 'createClass';
		if (x.style.display === 'none' || x.style.display === '') {
			x.style.display = 'block';
			document.getElementById(w).style.display = 'none';
		} else {
			document.getElementById('createClass').style.display = 'none';
		}
	}

	print() {
		var content = document.getElementById('print').outerHTML;
		var style = '<style type="text/css">th, td {border:1px solid #000; padding: 4px 8px; font-size: 18px;} table{border-collapse: collapse;}</style>';
		var a = window.open('');
		a.document.write(content);
		a.document.write(style);
		a.document.close();
		a.print();
	}

	render() {
		return (
			<div>
				<Head/>
				<div id="body">
					<div id="content">
						<h3>{this.state.user.name} {this.state.user.school}</h3>
						<div>
							<button className="createClass" onClick={this.select}>Создать класс</button>
							<button className="createStud" onClick={this.select}>Создать учеников</button>
							<button onClick={this.showLast}>Последние результаты</button>
							<Link to={{
				pathname: "/students",
				state: {
					user: this.state.user
				}
			}} className="button" user={this.state.user}>Просмотреть классы</Link>
							<Link to={{
				pathname: "/results",
				state: {
					user: this.state.user
				}
			}} className="button" user={this.state.user}>Просмотреть результаты</Link>
						</div>
			 		</div>
					<div id="side">
						<span className="success">{this.state.status}</span>
						{this.state.last.length > 0 ? (<table>
								<thead>
									<tr>
										<th className="name">Имя</th>
										<th className="class">Класс</th>
										<th>Тип</th>
										<th className="result">Результат</th>
									</tr>
								</thead>
								<tbody>
									{this.state.last.map((item) => <tr key={item.id}>
										<td className="name">{item.name}</td>
										<td className="class">{item.class}</td>
										<td>{item.type}</td>
										<td className="result">{item.result}</td>
									</tr>)}
								</tbody>
							</table>) : ('')}
						{this.state.data.length > 0 ? (<table  id="print">
							<thead>
								<tr>
									<th className="name">Имя</th>
									<th className="password">Пароль</th>
									<th className="class">Класс</th>
								</tr>
							</thead>
							<tbody>
								{this.state.data.map((stud) => <tr key={stud.id}>
									<td className="name">{stud.name}</td>
									<td className="password">{stud.password}</td>
									<td className="class">{stud.class}</td>
								</tr>)}
							</tbody>
						</table>) : ('')}
						{this.state.data.length > 0 ? (<button onClick={this.print}>Распечатать</button>) : ('')}
						<form id="createStud" onSubmit={this.handleSubmit}>
							<ul>
								<li>
									<label htmlFor="letter">Класс</label>
									<select name="class" onChange={this.handleChange} >
									<option value=""></option>
										{this.state.classes.map(item => <option key={item.id}>{item.class}</option>)};
									</select>
								</li>
								<li>
									<label htmlFor="students">Список студентов</label>
									<textarea name="students" cols="30" rows="10" value={this.state.students} onChange={this.handleChange} ></textarea>
								</li>
								<li><button type="submit">Создать</button></li>
							</ul>
						</form>
							<form id="createClass" onSubmit={this.handleCreate}>
							<ul>
								<li>
									<label htmlFor="number">Номер класса</label>
									<input type="number" name="number" value={this.state.number} onChange={this.handleChange} />
									</li>
								<li>
									<label htmlFor="letter">Буква</label>
									<input type="text" name="letter" value={this.state.letter} onChange={this.handleChange} />
								</li>
								<li><button type="submit">Создать</button></li>
							</ul>
						</form>
					</div>
				</div>
			</div>
			);
	}
}