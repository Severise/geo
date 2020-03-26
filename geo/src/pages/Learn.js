import React, { Component } from 'react';
import Head from '../components/Head';
import { ReactComponent as Map } from '../components/Map.svg';

export default class Learn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            role: "",
            loginError: ""
        };

        this.handleClick = this.handleClick.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }


    handleClick(event) {
        console.log(event.target)

        event.target.style.fill = "#ff0000";
    }




    render() {
        return (
            <div>
				<Head />
				<Map onClick={this.handleClick}/>
			</div>
        );
    }
}