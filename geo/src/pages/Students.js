import React, { Component } from 'react';
import axios from 'axios';

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
			error: '',
			classes: []
		}
		axios.get(`/classes`)
			.then(res => {
				this.setState({
					classes: res.data
				});
			}).catch(error => {
			console.log(error);
		});

		axios.get(`/students`, {
			params: {
				id: this.props.location.state.user.id
			}
		})
			.then(res => {
				this.setState({
					students: res.data
				});
				this.setState({
					showStudents: res.data
				});
			}).catch(error => {
			console.log(error);
		});

		this.handleClick = this.handleClick.bind(this);
		this.handleBlur = this.handleBlur.bind(this);

		this.handleChange = this.handleChange.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}

	handleClick(event) {
		if (event.target.className === "class") {
			this.setState({
				change: {
					id: event.target.parentElement.parentElement.firstElementChild.innerText,
					valStart: event.target.value,
					attr: event.target.className
				}
			});
		} else {
			this.setState({
				change: {
					id: event.target.parentElement.firstElementChild.innerText,
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
				}).catch(error => {
				target.innerHTML = this.state.change.valStart;
				this.setState(({
					error: 'Value does not changed'
				}));
			});
		}
	}

	handleChange(event) {
		var target = event.target;
		var value = event.target.value;
		if (this.state.change.attr && this.state.change.id && this.state.change.valStart !== event.target.value) {
			axios.post(`/changestudent`, {
				id: this.state.change.id,
				value: event.target.value,
				attr: this.state.change.attr
			})
				.then(res => {
					target.value = value;
				}).catch(error => {
				target.innerHTML = this.state.change.valStart;
				this.setState(({
					error: 'Value does not changed'
				}));
			});
		}
	}

	handleSelect(event) {
		var s = this.state.students.filter(student => student.classId === parseInt(event.target.value) || event.target.value.length === 0);
		this.setState({
			showStudents: s
		});
	}
	render() {
		return (
			<div id="body">
					<div>
					<li><label>class</label>
					<select name="class" onChange={this.handleSelect}>
						<option value=""></option>
						{this.state.classes.map(item => <option key={item.id} value={item.id}>{item.class}</option>)};
					</select></li>
					<div className="error">{this.state.error}</div>
					{this.props.location.pathname === '/students' ? (
				<table>
						<thead>
							<tr>
								<th>Имя</th>
								<th>Пароль</th>
								<th>Класс</th>
							</tr>
						</thead>
						<tbody>
							{this.state.showStudents.map((stud) => <tr  key={stud.id}>
								<td className="name" contentEditable="true" suppressContentEditableWarning={true} onClick={this.handleClick} onBlur={this.handleBlur}>{stud.name}</td>
								<td>{stud.password}</td>
								<td>
									<select className="class" name="class" value={stud.classId}  onClick={this.handleClick} onChange={this.handleChange}>
										{this.state.classes.map(item => <option key={item.id} value={item.id}>{item.class}</option>)};
									</select>
								</td>
							</tr>)}
						</tbody>
					</table>) : (
				<table>
						<thead>
							<tr>
								<th>Имя</th>
								<th>Класс</th>
								<th>Вид теста</th>
								<th>Результат</th>
							</tr>
						</thead>
						<tbody>
							{this.state.showStudents.map((stud) => <tr  key={stud.id}>
								<td>{stud.name}</td>
								<td>{stud.class}</td>
								<td>{stud.type}</td>
								<td>{stud.result}</td>
							</tr>)}
						</tbody>
					</table>)}
				</div>
			</div>
			);
	}
}