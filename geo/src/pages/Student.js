import React, { Component } from 'react';

export default class Student extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user
		}
	}

	render() {
		return (
			<div>
			</div>
			);
	}
}