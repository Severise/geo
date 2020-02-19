import React, { Component } from 'react';
import Head from '../components/Head';
import TeacherBody from '../components/TeacherBody';

export default class Teacher extends Component {
	render() {
		return (
			<div>
				<Head />
				<TeacherBody />
			</div>
		);
	}
}