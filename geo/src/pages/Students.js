import React, { Component } from 'react';
import axios from 'axios';
import Head from '../components/Head.js'

export default class Classes extends Component {

	constructor(props) {
		super(props);
		this.state = {
			students: [],
			showStudents: [],
			change: {
				id: 0,
				valStart: '',
				attr: ''
			},
			status: '',
			classes: [],
			results: [],
			showResults: []
		}
		axios.get(`/classes`)
			.then(res => {
				this.setState({
					classes: res.data
				});
			}).catch(error => {
			console.log(error);
		});

		if (this.props.location.pathname === '/students') {
			axios.get(`/students`, {
				params: {
					id: this.props.location.state.user.id
				}
			}).then(res => {
				this.setState({
					students: res.data,
					showStudents: res.data
				});
			}).catch(error => {
				console.log(error);
			});
		}

		if (this.props.location.pathname === '/results') {
			axios.get(`/results`, {
				params: {
					id: this.props.location.state.user.id
				}
			}).then(res => {
				console.log(res.data)
				this.setState({
					results: res.data,
					showResults: res.data
				});
			}).catch(error => {
				console.log(error);
			});
		}

		this.handleClick = this.handleClick.bind(this);
		this.handleBlur = this.handleBlur.bind(this);

		this.handleChange = this.handleChange.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}

	handleClick(event) {
		console.log('cli')
		this.setState(({
			status: ''
		}));
		if (event.target.className === "class") {
			this.setState({
				change: {
					id: event.target.parentElement.parentElement.id,
					valStart: event.target.value,
					attr: event.target.className
				}
			});
		} else {
			this.setState({
				change: {
					id: event.target.parentElement.id,
					valStart: event.target.innerText,
					attr: event.target.className
				}
			});
		}
	}

	handleBlur(event) {
		var target = event.target;
		if (event.target.innerText && this.state.change.attr && this.state.change.id && this.state.change.valStart !== event.target.innerText) {
			axios.post(`/changestudent`, {
				id: this.state.change.id,
				value: event.target.innerText,
				attr: this.state.change.attr
			})
				.then(res => {
					console.log(res);
					this.setState(({
						status: <div className="success">Значение успешно изменено</div>
					}));
				}).catch(error => {
				target.innerHTML = this.state.change.valStart;
				this.setState(({
					status: <div className="error">Значение не изменено</div>
				}));
			});
		}
	}

	handleChange(event) {
		console.log('chan')
		var target = event.target;
		var value = event.target.value;
		if (this.state.change.attr && this.state.change.id && this.state.change.valStart !== event.target.value) {
			axios.post(`/changestudent`, {
				id: this.state.change.id,
				value: event.target.value,
				attr: this.state.change.attr
			})
				.then(res => {
					this.setState({
						status: <div className="success">Значение успешно изменено</div>,
					});
					target.value = value;
				}).catch(error => {
				target.innerHTML = this.state.change.valStart;
				this.setState(({
					status: <div className="error">Значение не изменено</div>
				}));
			});
		}
	}

	handleSelect(event) {

		var s
		if (this.props.location.pathname === '/students') {
			s = this.state.students.filter(student => student.classId === parseInt(event.target.value) || event.target.value.length === 0);
		}

		if (this.props.location.pathname === '/results') {
			s = this.state.results.filter(result => result.classId === parseInt(event.target.value) || event.target.value.length === 0);
		}
		this.setState({
			showStudents: s,
			showResults: s
		});
	}
	render() {
		return (
			<div>
				<Head/>
				<div id="body">
					<div>
						{this.props.location.pathname === '/students' ?
				(<h3>Список учеников</h3>) : (<h3>Результаты</h3>)}
							<div>Сортировка по классу: 
								<li><label>Класс</label>
									<select name="class" onChange={this.handleSelect}>
										<option value=""></option>
										{this.state.classes.map(item => <option key={item.id} value={item.id}>{item.class}</option>)};
									</select>
								</li>
							</div>
							{this.state.status}
								{this.props.location.pathname === '/students' ? (<table>
									<thead>
										<tr>
											<th className="name">Имя</th>
											<th className="password">Пароль</th>
											<th className="class">Класс</th>
										</tr>
									</thead>
									<tbody>
										{this.state.showStudents.map((stud) => <tr  key={stud.id} id={stud.id}>
											<td className="name" contentEditable="true" suppressContentEditableWarning={true} onClick={this.handleClick} onBlur={this.handleBlur}>{stud.name}</td>
											<td className="password">{stud.password}</td>
											<td className="class">
												<select className="class" name="class" value={stud.classId}  onClick={this.handleClick} onChange={this.handleChange}>
													{this.state.classes.map(item => <option key={item.id} value={item.id}>{item.class}</option>)};
												</select>
											</td>
										</tr>)}
									</tbody>
								</table>) : (<table>
									<thead>
										<tr>
											<th className="name">Имя</th>
											<th>Класс</th>
											<th>Категория</th>
											<th>Результат</th>
										</tr>
									</thead>
									<tbody>
										{this.state.showResults.map((res) => <tr  key={res.id}>
											<td className="name">{res.name}</td>
											<td value={res.classId} >{res.class}</td>
											<td>{res.type}</td>
											<td>{res.result}</td>
										</tr>)}
									</tbody>
								</table>)}
						</div>
					</div>
				</div>
			);
	}
}