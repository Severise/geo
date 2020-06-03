import React, { Component } from 'react';
import { ReactComponent as Map } from '../components/Map.svg';
import list from '../components/list.json';
import _ from 'lodash';
import axios from 'axios';
import Head from '../components/Head.js'
import svgpan from '../components/svgpan.js'

export default class Learn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.location.state.user,
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
		this.saveResults = this.saveResults.bind(this);
	}

	handleStart() {
		var i;
		var min = 0;
		var max = 1;

		if (this.state.data.length < 1) {
			this.setState({
				current: {
					name: ""
				}
			}, this.count);
		} else {
			min = this.state.data[0].id;
			max = this.state.data.length + min;
			i = parseInt(Math.random() * (max - min) + min);
			i = i - min;
			this.setState({
				current: {
					id: this.state.data[i].id,
					name: this.state.data[i].name,
					try: 0
				}
			});
			this.state.data.splice(i, 1)
		}
	}


	handleClick(event) {
		if (!this.state.current.id) {
			return
		}
		var layer = event.target.parentElement.getAttribute("id");
		if (layer !== document.getElementsByClassName("chosen")[0].getAttribute("class").split(" ")[0]) {
			return;
		}
		if (parseInt(event.target.getAttribute("id")) !== this.state.current.id) {
			if (!event.target.classList.contains("right")) {
				this.setState({
					current: {
						id: this.state.current.id,
						name: this.state.current.name,
						try: this.state.current.try + 1
					}
				});
			}
			event.target.classList.add('wrong');
			return;
		} else {
			event.target.classList.add('right');
			var a = document.getElementsByClassName("wrong");
			for (var i = a.length - 1; i >= 0; i--) {
				a[i].classList.remove('wrong');
			}
			var name = document.getElementsByClassName("chosen")[0].getAttribute("class").split(" ")[0];
			this.setState({
				results: {
					name: name,
					res: this.state.results.res.concat([this.state.current]),
					sum: this.state.results.sum
				}
			}, this.handleStart);
		}
	}

	handleChoose(event) {
		this.setState({
			status: ''
		});
		var cur = event.target.className;
		var prev;
		this.setState({
			results: {
				name: '',
				res: [],
				sum: 0
			}
		})
		if (document.getElementsByClassName("chosen")[0]) {
			prev = document.getElementsByClassName("chosen")[0];
			if (event.target.classList.contains(prev.getAttribute("class").split(" ")[0])) {
				return;
			}
			prev.classList.remove("chosen");
			prev = prev.getAttribute("class").split(" ")[0];
			var a = document.getElementsByClassName("wrong");
			var b = document.getElementsByClassName("right");
			for (var i = a.length - 1; i >= 0; i--) {
				a[i].classList.remove('wrong');
			}
			for (var j = b.length - 1; j >= 0; j--) {
				b[j].classList.remove('right');
			}
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
		}, this.handleStart);
	}

	count() {
		var res = this.state.results.res;
		var item;
		var sum = 0;
		for (var i = 0; i < res.length; i++) {
			item = 1. - (res[i].try / 3);
			item = item > 0 ? item : 0;
			item = (100. / res.length) * item;
			sum += item;
		}

		this.setState({
			results: {
				name: this.state.results.name,
				res: this.state.results.res,
				sum: Math.round(sum)
			}
		}, this.saveResults);
	}

	saveResults() {
		if (!this.state.user.id) {
			return;
		}
		axios.post('saveresults', {
			results: this.state.results,
			id: this.state.user.id
		}).then(res => {

			this.setState({
				status: <div>Ваш результат был сохранен, Вы набрали {this.state.results.sum}%</div>
			});
		}).catch(error => {
			if (error.response.status === 304) {
				this.setState({
					status: <div>Тест уже пройден, результат не был сохранен, Вы набрали {this.state.results.sum}%</div>
				});
			} else {
				this.setState({
					status: 'Ошибка, попробуйте пройти еще раз'
				});
			}
		});
	}

	render() {
		return (
			<div>
				<Head/>
				<div id="body">
					<div id="content">
						<h2 onClick={this.saveResults}>Иркутская область</h2>
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
							{this.state.current.id == null ? (<div>Выберите слой для тестирования</div> ) : (<div>Найдите заданный объект: <br/>
									<span>{this.state.current.name}</span><br/>
									Попыток: {this.state.current.try}</div>)}
									{this.state.status}
						</div>	
					</div>
				</div>
			</div>
			);
	}
}