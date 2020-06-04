import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Head from '../components/Head.js'
import axios from 'axios';

export default class Student extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.location.state.user,
			results: []
		}
		this.loadResults = this.loadResults.bind(this);
	}

	loadResults(event) {
		axios.get(`/studentresults`, {
			params: {
				id: this.state.user.id
			}
		}).then(res => {
			this.setState({
				results: res.data
			});
		}).catch(error => {
			console.log(error);
		});
	}

	render() {
		return (
			<div>
				<Head/>
				<div id="body">
					<div id="content">
						<h3>{this.state.user.name} {this.state.user.class}</h3>
						<div>
							<Link to={{
				pathname: '/learn',
				state: {
					user: this.state.user
				}
			}} className="button" user={this.state.user}>Пройти обучение</Link>
			<Link to={{
				pathname: '/test',
				state: {
					user: this.state.user
				}
			}} className="button" user={this.state.user}>Пройти тестирование</Link>
							<button className="stud" onClick={this.loadResults}>Просмотреть результаты</button>
						</div>
			 		</div>
					<div id="side">
					{this.state.results.length > 0 ? (<table id="results">
							<thead>
								<tr>
									<th className="name">Имя</th>
									<th>Категория</th>
									<th>Результат</th>
								</tr>
							</thead>
							<tbody>
								{this.state.results.map((result) => <tr key={result.id}>
									<td className="name">{result.name}</td>
									<td>{result.type}</td>
									<td>{result.result}</td>
								</tr>)}
							</tbody>
						</table>) : ('')}
					</div>
				</div>
			</div>
			);
	}
}