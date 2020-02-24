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
			}
		}

		axios.get(`/classes`)
			.then(res => {
				this.setState({ students: res.data });
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
		if (event.target.innerText && this.state.change.attr && this.state.change.id && this.state.change.valStart !== event.target.innerText) {
			axios.post(`/changestudent`, {
					id: this.state.change.id,
					value: event.target.innerText,
					attr: this.state.change.attr
				})
				.then(res => {
					console.log(res);
				}).catch(error => {
					console.log(error);
				});
		}
	}

	render() {
		return (
			<div>
				<Head />
				<div id="body">
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