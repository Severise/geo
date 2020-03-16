import React, { Component } from 'react';
import Head from '../components/Head';
import axios from 'axios';

export default class Classes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            showStudents: [],
            change: {
                id: 0,
                valStart: '',
                attr: ''
            },
            error: '',
            classes: []

        }
        axios.get(`/classes`)
            .then(res => {
                this.setState({ classes: res.data });
            }).catch(error => {
                console.log(error);
            });

        console.log(this.props.location.state.user)

        axios.get(`/students`, {
                params: {
                    teacherId: this.props.location.state.user.id
                }
            })
            .then(res => {
                this.setState({ students: res.data });
                this.setState({ showStudents: res.data });
            }).catch(error => {
                console.log(error);
            });

        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleClick(event) {
        // console.log(event.target.options[event.target.selectedIndex].innerText);
        // console.log( event.target.value);

        if (event.target.className === "class")
            this.setState({
                change: {
                    id: event.target.parentElement.parentElement.firstElementChild.innerText,
                    valStart: event.target.value,
                    attr: event.target.className
                }
            });
        else
            this.setState({
                change: {
                    id: event.target.parentElement.firstElementChild.innerText,
                    valStart: event.target.innerText,
                    attr: event.target.className
                }

            });
    }

    handleBlur(event) {
        console.log(this);
        var target = event.target;
        if (event.target.innerText && this.state.change.attr && this.state.change.id && this.state.change.valStart !== event.target.innerText) {
            axios.post(`/changestudent`, {
                    id: this.state.change.id,
                    value: event.target.innerText,
                    attr: this.state.change.attr
                })
                .then(res => {
                    console.log(res);
                }).catch(error => {
                    console.log(target);
                    target.innerHTML = this.state.change.valStart;
                    this.setState(({ error: 'Value does not changed' }));
                    console.log(error);
                });
        }
    }

    handleChange(event) {
        console.log(event.target);
        var target = event.target;
        var value = event.target.value;
        if (this.state.change.attr && this.state.change.id && this.state.change.valStart !== event.target.value) {
            axios.post(`/changestudent`, {
                    id: this.state.change.id,
                    value: event.target.value,
                    attr: this.state.change.attr
                })
                .then(res => {
                    console.log(res);
                    target.value = value;
                }).catch(error => {
                    console.log(target);
                    target.innerHTML = this.state.change.valStart;
                    this.setState(({ error: 'Value does not changed' }));
                    console.log(error);
                });
        }
    }

    handleSelect(event) {

        var s = this.state.students.filter(student => student.classId === parseInt(event.target.value) || event.target.value.length === 0);
        this.setState({ showStudents: s });
        console.log(s);
    }
    render() {
        return (
            <div>
				<Head />
				<div id="body">
					<li><label>class</label>
					<select name="class" onChange={this.handleSelect}>
						<option value="">Все</option>
						{this.state.classes.map(item =>
							<option key={item.id} value={item.id}>{item.class}</option>
						)};
					</select></li>
					<div className="error">{this.state.error}</div>
					<table>
						<thead>
							<tr>
								<th>id</th>
								<th>name</th>
								<th>password</th>
								<th>class</th>
							</tr>
						</thead>
						<tbody>
							{this.state.showStudents.map((stud)=><tr  key={stud.id}>
								<td>{stud.id}</td>
								<td className="name" contentEditable="true" suppressContentEditableWarning={true} onClick={this.handleClick} onBlur={this.handleBlur}>{stud.name}</td>
								<td>{stud.password}</td>
								<td>
									<select className="class" name="class" value={stud.classId}  onClick={this.handleClick} onChange={this.handleChange}>
										{this.state.classes.map(item =>
											<option key={item.id} value={item.id}>{item.class}</option>
										)};
									</select>
								</td>
							</tr>)}
							</tbody>
					</table>
				</div>
			</div>
        );
    }
}