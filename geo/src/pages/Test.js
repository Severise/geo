import React, { Component } from 'react';
import { ReactComponent as Map } from '../components/Map.svg';
import list from '../components/list.json';
import _ from 'lodash';
import axios from 'axios';

export default class Learn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.location.state.user,
			current: {},
			data: _.cloneDeep(list['region']),
			results: {
				name: '',
				res: [],
				sum: 0
			},
			error: ''
		};
		console.log(this.state.user)
		console.log(!this.state.user)
		console.log(this.state.user.id)
		console.log(!this.state.user.id)
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
			i = -1;
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
		var layer = event.target.parentElement.getAttribute("id");
		if (!this.state.current.id) {
			return
		}
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
			event.target.classList.remove('wrong');
			event.target.classList.add('right');
			var name = document.getElementsByClassName("chosen")[0].getAttribute("class").split(" ")[0];
			this.setState({
				results: {
					name: name,
					res: this.state.results.res.concat([this.state.current]),
					sum: this.state.results.sum
				}
			}, this.handleStart());
		}
	}


	handleChoose(event) {
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
			// console.log(res.data);
		}).catch(error => {
			//resend????
			this.setState({
				error: 'Ошибка сервера, пройдите тест еще раз'
			});
		});
	}
	render() {
		return (
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
						{this.state.current.id == null ? (<div>Выберите слой</div> ) : (<div>Найдите заданный объект: <br/>
								<span>{this.state.current.name}</span><br/>
								Попыток: {this.state.current.try}</div>)}
								{this.state.results.sum > 0 && this.state.user.id ? (<div>Ваш результат был сохранен, вы набрали {this.state.results.sum}%</div> ) : ('')}
								{!this.state.user.id && this.state.results.sum > 0 ? (<div>Вы набрали {this.state.results.sum}%</div>) : ('')}
					</div>	

				</div>
			</div>
			);
	}
}

// <div id="results">
// 					<ul><li>Пещера Охотничья (1)</li><li>Озеро Шара-Нур (1)</li><li>Патомский кратер (0)</li><li>Агульское озеро (0)</li><li>Заповедник Витимский (3)</li><li>Озеро Орон (0)</li><li>Шаман-камень (0)</li><li>Мыс Хобой (0)</li><li>Источник Талая (1)</li><li>Ледники Кодара (0)</li><li>Пик Черского (0)</li><li>Пещеры Тажеранских степей (1)</li><li>Нижнеудинские пещеры (0)</li><li>Результат: 86.53846153846155</li></ul>
// 						<ul>
// 							{this.state.results.res.map((item) => <li key={item.id}>{item.name} ({item.try})</li>)}	
// 							<li>Результат: {this.state.results.sum}%</li>
// 						</ul>	
// 					</div>