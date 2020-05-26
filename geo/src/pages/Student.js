import React, { Component } from 'react';

export default class Student extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.location.state.user
		}

		console.log(this.state)
	}

	render() {
		return (
			<div>
			TELL THAT ONLY FIRST ATTEMPT WILL COUNT AND FUTHER TRIES ARE USELESS
			</div>
			);
	}
}