import React, { Component } from 'react';
import Head from '../components/Head';
import Form from '../components/Form';

export default class Login extends Component {

	render() {
		return (
			<div>
				<Head />
				<Form history={this.props.history}/>
			</div>
		);
	}
}