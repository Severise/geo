import React, { Component } from 'react';
import show from '../components/TeacherBodyJs.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Teacher extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.location.state.user,
			classes: [],
			students: '',
			data: [{
				name: "dds",
				password: 'dsad'
			}, {
				name: "dd22s",
				password: 'dsad'
			}, {
				name: "dd42s",
				password: 'dsad'
			}, {
				name: "dd232s",
				password: 'dsad'
			}],
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
		this.handleClick = this.showLast.bind(this);

		axios.get(`/classes`)
			.then(res => {
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
		})
			.then(res => {
				this.setState({
					data: res.data
				});
				this.setState({
					students: '',
					classValue: '',
					class: ''
				});
				console.log(this.state)
			}).catch(error => {
			console.log(error);
		});
	}
	handleCreate(event) {
		event.preventDefault();
		axios.post(`/createClass`, {
			id: this.state.user.id,
			number: this.state.number,
			letter: this.state.letter
		})
			.then(res => {
				this.setState({
					status: 'Создан класс:' + res.data.number + ' ' + res.data.letter
				});
				this.setState({
					letter: '',
					number: ''
				});
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
		if (event.target.getAttribute('name') === "class") {
			this.setState({
				[event.target.name]: event.target.options[event.target.selectedIndex].value
			});
			this.setState({
				classValue: event.target.options[event.target.selectedIndex].innerText
			});
		}
	}
	showLast(event) {
		console.log('last')
		axios.get(`/results`)
			.then(res => {
				this.setState({
					last: res.data
				});
			}).catch(error => {
			console.log(error);
		});
	}
	render() {
		return (
			<div id="body">
				<div id="content">
					<button className="class" onClick={show}>Создать класс</button>
					<button className="stud" onClick={show}>Создать учеников</button>
					<Link to={{
				pathname: '/students',
				state: {
					user: this.state.user
				}
			}} className="button" user={this.state.user}>Просмотреть класы</Link>
							<button className="stud" onClick={this.showLast}>Показать последние результаты</button>
							<Link to={{
				pathname: '/results',
				state: {
					user: this.state.user
				}
			}} className="button" user={this.state.user}>Просмотреть результаты</Link>
					{this.state.last.length > 0 ? (<table>
							<thead>
								<tr>
									<th>name</th>
									<th>class</th>
									<th>type</th>
									<th>result</th>
								</tr>
							</thead>
							<tbody>
								{this.state.last.map((item) => <tr key={item.name}>
									<td>{item.name}</td>
									<td>{item.class}</td>
									<td>{item.type}</td>
									<td>{item.result}</td>
								</tr>)}
							</tbody>
						</table>
				) : ('')}
		 		</div>
				<div id="side">
					<span className="success">{this.state.status}</span>
					<form id="stud" style={{
				display: 'none'
			}} onSubmit={this.handleSubmit}>
						<ul>
							<li>
								<label htmlFor="letter">Класс</label>
								<select name="class" onChange={this.handleChange} >
								<option value=""></option>
									{this.state.classes.map(item => <option key={item.id} >{item.class}</option>)};
								</select>
							</li>
							<li>
								<label htmlFor="students">Список студентов</label>
								<textarea name="students" cols="30" rows="10" value={this.state.students} onChange={this.handleChange} ></textarea>
							</li>
							<li><button type="submit">Создать</button></li>
						</ul>
					</form>
						<form id="class" style={{
				display: 'none'
			}} onSubmit={this.handleCreate}>
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
					{this.state.data.length > 0 ? (<table>
							<thead>
								<tr>
									<th>name</th>
									<th>password</th>
									<th>class</th>
								</tr>
							</thead>
							<tbody>
								{this.state.data.map((stud) => <tr key={stud.name}>
									<td>{stud.name}</td>
									<td>{stud.password}</td>
									<td>{stud.class}</td>
								</tr>)}
							</tbody>
						</table>
				) : ('')}
				</div>
			</div>
			);
	}
}