import React, { Component } from 'react';
import { ReactComponent as Map } from '../components/Map.svg';
import list from '../components/list.json';
import _ from 'lodash';

export default class Learn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: {},
			data: _.cloneDeep(list['region']),
			results: {
				name: '',
				res: [],
				sum: 0
			}
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
		// this.setState({
		// 	results: {
		// 		name: q,
		// 		res: []
		// 	}
		// });

		if (this.state.data.length < 1) {
			i = -1;
			this.setState({
				current: {
					name: ""
				}
			},
				this.count
			);
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
			// this.setState({ results:{name: name,  res: this.state.results.res.concat([this.state.current]) } });

			// this.setState({
			// 	data: this.state.data.splice(i, 1)
			// }, function function_name(argument) {
			// 	console.log(this.state.data)
			// });
			this.state.data.splice(i, 1)
		}

	}


	handleClick(event) {
		console.log(this.state.results)
		var layer = event.target.parentElement.getAttribute("id");
		//console.log(event.target.getAttribute('name'))
		//console.log(event.target.getAttribute('id'))
		//console.log(event.target.parentElement.getAttribute("id"));
		//console.log(document.getElementsByClassName("chosen")[0].getAttribute("class").split(" ")[0]);
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
					res: this.state.results.res.concat([this.state.current])
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
				res: []
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
		},
			this.handleStart);
	}


	count() {
		var res = this.state.results.res;
		var item;
		var sum = 0;
		for (var i = 0; i < res.length; i++) {
			item = 1. - (0.25 * res[i].try);
			console.log(item)
			item = item > 0 ? item : 0;
			console.log(item)
			item = (100. / res.length) * item;
			sum += item;
		}
		this.setState({
			results: {
				name: this.state.results.name,
				res: this.state.results.res,
				sum: sum
			}
		});
	}
	render() {
		return (
			<div id="body">
				<div id="content">
				<h2>Иркутская область</h2>
					<Map  ref={this.map} onClick={this.handleClick} />
				</div>
				<div id="side">
					<ul id="layers">
						<li className="region" onClick={this.handleChoose}>Районы</li>
						<li className="city" onClick={this.handleChoose}>Города</li>
						<li className="river" onClick={this.handleChoose}>Реки</li>
						<li className="place" onClick={this.handleChoose}>Места</li>
					</ul>
					<div>
						{this.state.current.id == null ? (<div>Выберите слой<div>Ваш результат был сохранен, вы набрали {this.state.results.sum}%</div> </div> ) :
				(<div>Найдите заданный объект: <br/>
								<span>{this.state.current.name}</span><br/>
								Попыток: {this.state.current.try}</div>)}
						
					</div>	
					<div>
					<ul><li>Пещера Охотничья (1)</li><li>Озеро Шара-Нур (1)</li><li>Патомский кратер (0)</li><li>Агульское озеро (0)</li><li>Заповедник Витимский (3)</li><li>Озеро Орон (0)</li><li>Шаман-камень (0)</li><li>Мыс Хобой (0)</li><li>Источник Талая (1)</li><li>Ледники Кодара (0)</li><li>Пик Черского (0)</li><li>Пещеры Тажеранских степей (1)</li><li>Нижнеудинские пещеры (0)</li><li>Результат: 86.53846153846155</li></ul>
						<ul>
							{this.state.results.res.map((item) => <li key={item.id}>{item.name} ({item.try})</li>)}	
							<li>Результат: {this.state.results.sum}%</li>
						</ul>	
					</div>	
				</div>
			</div>
			);
	}
}