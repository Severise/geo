import React, { Component } from 'react';
import show from './TeacherBodyJs.js';
import axios from 'axios';
import { Link } from 'react-router-dom';



export default class TeacherBody extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            user: this.props.user,
            classes: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);


        axios.get(`/classes`)
            .then(res => {
                this.setState({ classes: res.data });
                console.log(this.state.classes);
                console.log(this.state.classes.map((team) => team.class));
            }).catch(error => {
                console.log(error);
            });
    }

    handleSubmit(event) {
        //send teacher id
        axios.post(`/regstudents`, {
                dsa: 'ds'
            })
            .then(res => {
                this.setState({ students: res.data });
                console.log(this.state.classes)
            }).catch(error => {
                console.log(error);
            });
        // <li>
        // 				<label htmlFor="class">Класс</label>
        // 				<select>
        // 				</select>
        // 			</li>
    }


    // <select>
    // 				{this.state.classes.map((class)=>
    // 						<option key={class.id} value={class.name}>{class.name}</option>
    // 				)}
    // 		</select>
    render() {
        return (
            <div id="body">
				<div id="content">
					<Link to={{pathname:'/students', state:{user:this.state.user}}} className="button" user={this.state.user}>Просмотреть классы</Link>
					<button onClick={show}>Создать класс</button>
				</div>
				<div id="side">
					<form action="/regstudents" method="post" id="show" style={{display: 'none'}} onSubmit={this.handleSubmit}>
						<ul>
							<li>
								<label htmlFor="number">Номер класса</label>
								<input type="text" name="number"/>
								</li>
							<li>
								<label htmlFor="letter">Буква</label>
								<input type="text" name="letter"/>
							</li>
							<li>
								<label htmlFor="letter">Класс</label>
								<select name="class" >
									{this.state.classes.map(item =>
										<option key={item.id} value={item.id}>{item.class}</option>
									)};
								</select>
							</li>
							<li>
								<label htmlFor="students">Список студентов</label>
								<textarea name="students" cols="30" rows="10"></textarea>
							</li>
							<li><button type="submit">Создать</button></li>
						</ul>
					</form>
				</div>
			</div>
        );
    }
}