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
			curData: [],
			curTest: [],
			status: '',
			test: false
		};
		this.map = React.createRef();
		this.handleClick = this.handleClick.bind(this);
		this.handleChoose = this.handleChoose.bind(this);
		this.handleStart = this.handleStart.bind(this);
	}

	startLearn() {
		if (this.state.curData.length < 1) {
			this.handleStart();
			return;
		}
		var i;
		var min = 0;
		var max = 1;

		min = this.state.curData[0].id;
		max = this.state.curData.length + min;
		i = parseInt(Math.random() * (max - min) + min);
		i = i - min;
		this.setState({
			current: {
				id: this.state.curData[i].id,
				name: this.state.curData[i].name
			}
		}, () => document.getElementById(this.state.current.id).classList.add("right"));
		this.state.curData.splice(i, 1);
	}

	handleStart() {
		var a = document.getElementsByClassName("right");
		for (var i = a.length - 1; i >= 0; i--) {
			a[i].classList.remove('right');
		}
		if (this.state.data.length < 1) {
			this.setState({
				current: {
					name: ""
				}
			});
			return;
		}
		var k = Math.random() * (this.state.data.length - 5);
		var t = this.state.data.splice(k, 5);
		this.setState({
			curData: t,
			curTest: _.cloneDeep(t),
			test: false
		}, this.startLearn);
	}

	startTest() {
		var i;
		var min = 0;
		var max = 1;
		if (this.state.curTest.length < 1) {
			this.handleStart();
		} else {
			min = this.state.curTest[0].id;
			max = this.state.curTest.length + min;
			i = parseInt(Math.random() * (max - min) + min);
			i = i - min;
			this.setState({
				current: {
					id: this.state.curTest[i].id,
					name: this.state.curTest[i].name,
					try: 0
				}
			});
			this.state.curTest.splice(i, 1);
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
		if (!this.state.test) {
			if (parseInt(event.target.getAttribute("id")) === this.state.current.id) {
				event.target.classList.remove('right');
				if (this.state.curData.length > 0) {
					this.startLearn();
				} else {
					this.setState({
						test: true
					}, this.startTest)
				}
			}
		} else {
			var a = document.getElementsByClassName("wrong");
			for (var i = a.length - 1; i >= 0; i--) {
				a[i].classList.remove('wrong');
			}
			if (parseInt(event.target.getAttribute("id")) !== this.state.current.id) {
				if (!event.target.classList.contains("right")) {
					this.setState({
						current: {
							id: this.state.current.id,
							name: this.state.current.name,
							try: this.state.current.try + 1
						}
					}, this.checkTry);
				}
				event.target.classList.add('wrong');
				return;
			} else {
				event.target.classList.add('right');
				this.startTest();
			}
		}
	}
	checkTry() {
		if (this.state.current.try > 3) {
			this.setState({
				data: [this.state.current].concat(this.state.data)
			}, () => {
				var a = document.getElementsByClassName("wrong");
				for (var i = a.length - 1; i >= 0; i--) {
					a[i].classList.remove('wrong');
				}
				this.startTest();
			})
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
		}, this.handleStart);
	}

	render() {
		return (
			<div>
				<Head/>
				<div id="body">
					<div id="content">
					<h2>Иркутская область</h2>
						<div id="map">
							<Map ref={this.map} onClick={this.handleClick} />
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
							{this.state.current.id == null ? (<div>Выберите слой</div>) : (<div>
							{this.state.test ?
				(<div>Найдите заданный объект: <br/>
									<span>{this.state.current.name}</span><br/>
									Попыток: {this.state.current.try}<br/><br/>
									После 4 неудачных попыток объект будет показан повторно.</div>) :
				(<div>Запомните название и расположение: {this.state.current.name}<br/><br/>
								Для продолжения нажмите на заданное место на карте.</div>)}</div>)}
								{this.state.status}
						</div>	
					</div>
				</div>
			</div>
			);
	}
}