import React, { Component } from 'react';
import { ReactComponent as Map } from '../components/Map.svg';
import list from '../components/list.json';
import _ from 'lodash';
import Head from '../components/Head.js'

export default class Learn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: {},
			data: [],

			results: {
				name: '',
				res: [],
				sum: 0
			},
			status: ''
		};
		this.map = React.createRef();
		this.handleClick = this.handleClick.bind(this);
		this.handleChoose = this.handleChoose.bind(this);
		this.handleStart = this.handleStart.bind(this);
	}

	handleStart() {
		var i;
		var min = 0;
		var max = 1;

		if (this.state.data.length < 1) {
			i = -1;
			this.setState({
				current: {
					name: ""
				}
			});
		} else {
			min = this.state.data[0].id;
			max = this.state.data.length + min;
			i = parseInt(Math.random() * (max - min) + min);
			i = i - min;
			this.setState({
				current: {
					id: this.state.data[i].id,
					name: this.state.data[i].name
				}
			}, () => document.getElementById(this.state.current.id).classList.add("right"));
			this.state.data.splice(i, 1);
		}
	}


	handleClick(event) {
		var layer = event.target.parentElement.getAttribute("id");
		if (!this.state.current.id) {
			return
		}
		if (layer !== document.getElementsByClassName("chosen")[0].getAttribute("class").split(" ")[0]) {
			return;
		}
		if (parseInt(event.target.getAttribute("id")) === this.state.current.id) {
			event.target.classList.remove('right');
			this.handleStart();
		}
	}


	handleChoose(event) {
		var cur = event.target.className;
		var prev;
		if (document.getElementsByClassName("chosen")[0]) {
			prev = document.getElementsByClassName("chosen")[0];
			if (event.target.classList.contains(prev.getAttribute("class").split(" ")[0])) {
				return;
			}
			var b = document.getElementsByClassName("right");
			for (var j = b.length - 1; j >= 0; j--) {
				b[j].classList.remove('right');
			}
			prev.classList.remove("chosen");
			prev = prev.getAttribute("class").split(" ")[0];
			document.getElementById(prev).style.display = "none";
		}
		document.getElementById("region").style.display = "inline";
		document.getElementById(cur).style.display = "inline";
		document.getElementsByTagName("svg")[0].getElementsByClassName("active")[0].classList.remove("active");
		document.getElementsByTagName("svg")[0].getElementById(cur).classList.add("active");
		event.target.classList.add("chosen");
		var clone = _.cloneDeep(list);
		clone = clone[cur];
		this.setState({
			data: clone
		},
			this.handleStart);
	}


	render() {
		return (
			<div>
				<Head/>
				<div id="body">
					<div id="content">
					<h2>Иркутская область</h2>
						<div id="map">
							<Map  ref={this.map} onClick={this.handleClick} />
						</div>
					</div>
					<div id="side">
						<ul id="layers">
							<li className="region" onClick={this.handleChoose}>Районы</li>
							<li className="city" onClick={this.handleChoose}>Города</li>
							<li className="river" onClick={this.handleChoose}>Реки</li>
							<li className="place" onClick={this.handleChoose}>Места</li>
						</ul>
						<div>
							{this.state.current.id == null ? (<div>Выберите слой</div> ) : (<div>Запомните название и расположение: {this.state.current.name}<br/><br/>
								Для продолжения нажмите на заданное место на карте.</div>)}
								{this.state.status}
						</div>	
					</div>
				</div>
			</div>
			);
	}
}