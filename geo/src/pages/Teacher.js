import React, { Component } from 'react';
import Head from '../components/Head';
import TeacherBody from '../components/TeacherBody';

export default class Teacher extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
		}
	}

render() {
		return (
			<div>
				<Head />
				<TeacherBody user={this.props.location.state.user}/>
			</div>
		);
	}
}