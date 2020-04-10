import React, { Component } from 'react';
import Head from '../components/Head';
import { ReactComponent as Map } from '../components/Map.svg';
import list from '../components/list.json';

export default class Learn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            role: "",
            loginError: "",
            current: {},
            try: 0
        };
        this.map = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleChoose = this.handleChoose.bind(this);
        this.handleStart = this.handleStart.bind(this);
        // this.handleChange = this.handleChange.bind(this);

    }

    handleStart() {
        var i;
        var min = 0,
            max = 1;
        var q = document.getElementsByClassName("chosen")[0].getAttribute("class").split(" ")[0];
        if (!list[q][0]) {
            i = -1;
            this.setState({ current: { name: "zakonchilis" } });
        } else {
            min = list[q][0].id;
            max = list[q].length + min;
            i = parseInt(Math.random() * (max - min) + min);
            // console.log(i, list[q][i-min]);
            this.setState({ current: list[q][i - min] });
            list[q].splice(i - min, 1);
        }

        //make this in handleclick
        if (true) {
            //set new current 
        } else {

        }
    }


    handleClick(event) {
        //console.log(event.target.getAttribute('name'))
        //console.log(event.target.getAttribute('id'))

        //console.log(event.target.parentElement.getAttribute("id"));
        //console.log(document.getElementsByClassName("chosen")[0].getAttribute("class").split(" ")[0]);
        console.log(event.target.getAttribute("id"));
        console.log(this.state.current.id);
        if (event.target.getAttribute("id") !== this.state.current.id)

            // if (event.target.parentElement.getAttribute("id") !== document.getElementsByClassName("chosen")[0].getAttribute("class").split(" ")[0])
            return
        event.target.style.fill = "#ff0000";
        this.handleStart();
    }


    handleChoose(event) {
        var i = document.getElementsByClassName("chosen")[0];
        i.classList.remove("chosen");
        document.getElementById(i.getAttribute("class").split(" ")[0]).style.display = "none";
        document.getElementById("region").style.display = "inline";

        document.getElementById(event.target.className).style.display = "inline";
        const node = this.map.current;
        console.log(node.getElementById(event.target.className));
        event.target.classList.add("chosen");

    }

    reset() {

    }

    render() {
        return (
            <div>
				<Head />
				<div id="body" >
					<div id="content">
					<h2>Иркутская область</h2>
						<Map  ref={this.map} onClick={this.handleClick} />
					</div>
						<ul id="layers">
							<li className="region chosen" onClick={this.handleChoose}>Районы</li>
							<li className="city" onClick={this.handleChoose}>Города</li>
							<li className="river" onClick={this.handleChoose}>Реки</li>
							<li className="place" onClick={this.handleChoose}>Места</li>
						</ul>
					<div id="side">
						<div>Найдите заданный объект: <br/>
							<span>{this.state.current.name}</span><br/>
							Попыток: {this.state.try}
							<div  onClick={this.handleStart}>na4at</div>
						</div>		
					</div>		
				</div>
			</div>
        );
    }
}