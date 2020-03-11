import React, { Component } from 'react';
import Head from '../components/Head';
import axios from 'axios';

export default class Classes extends Component {

	constructor(props) {
		super(props);
		this.state = {
			students: [],
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
				this.setState({ classes: res.data });
				console.log(this.state.classes);
			}).catch(error => {
				console.log(error);
			});

		console.log(this.props.location.state.user)

		axios.get(`/students`, {
				params: {
					teacherId: this.props.location.state.user.id
				}
			})
			.then(res => {
				this.setState({ students: res.data });
				console.log(this.state.students);
			}).catch(error => {
				console.log(error);
			});

		this.handleClick = this.handleClick.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	handleClick(event) {
		this.setState({
			change: {
				id: event.target.parentElement.firstElementChild.innerText,
				valStart: event.target.innerText,
				attr: event.target.className
			}
		});
	}

	handleBlur(event) {
		console.log(this.state.change);
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
					console.log(target);
					target.innerHTML = this.state.change.valStart;
					this.setState(({ error: 'Value does not changed' }));
					console.log(error);
				});
		}
	}


	render() {
		return (
			<div>
				<Head />
				<div id="body">
					<label>class</label>
					<div className="error">{this.state.error}</div>
					<select name="class">
					{this.state.classes.map(class =>
						<option key={class.id} value={class.id}>{class.name}</option>
					)};
					</select>
					<table>
						<thead>
							<tr>
								<th>id</th>
								<th>name</th>
								<th>password</th>
								<th>class</th>
							</tr>
						</thead>
						<tbody>
							{this.state.students.map((stud)=><tr  key={stud.id}>
								<td>{stud.id}</td>
								<td className="name" contentEditable="true" suppressContentEditableWarning={true} onClick={this.handleClick} onBlur={this.handleBlur}>{stud.name}</td>
								<td>{stud.password}</td>
								<td className="class" contentEditable="true" suppressContentEditableWarning={true} onClick={this.handleClick} onBlur={this.handleBlur}>{stud.class}</td>
							</tr>)}
							</tbody>
					</table>
				</div>
			</div>
		);
	}
}