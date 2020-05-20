const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken')

const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const md5 = require('md5');

const app = express();
app.use(cors());
var generatePassword = require('password-generator');

const router = express.Router();
const API_PORT = 3001;

app.use(express.json());
app.use(session({
	secret: 'geography',
	resave: true,
	saveUninitialized: true
}));


const mysql = require('mysql');
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'geo'
});

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(morgan('dev'));

var user;

app.post('/login', (req, res) => {
	var q;
	if (req.body.role === 'teacher') {
		q = "`" + req.body.role + "s` where login = '" + req.body.login + "' and password='" + md5(req.body.password) + "'";
	} else {
		q = "`" + req.body.role + "s`, `classes`  where name = '" + req.body.login + "' and password='" + req.body.password + "' and classes.id=class_id";
	}
	console.log(q)
	db.query("select * from " + q, function(err, rows, fields) {
		if (err) {
			res.send(err);
		} else if (!rows[0]) {
			res.status(404).send({
				'error': "User not found"
			});
		} else {
			console.log(rows[0])
			user = {
				id: rows[0].id,
				name: rows[0].name,
				login: rows[0].login,
				school: rows[0].school,
				class: rows[0].class_id ? rows[0].number + ' ' + rows[0].letter : undefined
			};
			var token = jwt.sign(user, 'geography', {
				expiresIn: 10000
			});
			console.log(token)
			res.send(token);
		}
	});

});




app.get('/classes', (req, res) => {
	db.query("select id, number, letter from `classes`", function(err, rows, fields) {
		if (err) {
			res.send(err);
		} else {
			var classes = [];
			for (var i = 0; i < rows.length; i++) {
				classes.push({
					id: rows[i].id,
					class: rows[i].number + ' ' + rows[i].letter
				})
			}
			res.send(classes);
		}
	});

});


app.get('/students', (req, res) => {
	db.query("select students.id as id, students.name as name, students.password as password, classes.number as number, classes.letter as letter, classes.id as classId  from `students`, `classes` where `teacher_id`=" + req.query.id + " and students.class_id=classes.id", function(err, rows, fields) {
		if (err) {
			res.send(err);
		} else {
			console.log(rows)
			var studs = [];
			for (var i = 0; i < rows.length; i++) {
				studs.push({
					id: rows[i].id,
					name: rows[i].name,
					password: rows[i].password,
					class: rows[i].number + ' ' + rows[i].letter,
					classId: rows[i].classId,

				})
			}
			res.send(studs);
		}
	});

});


app.post('/regstudents', (req, res) => {
	console.log('reg')
	console.log(req.body)
	var studs = req.body.students.split(/,| |;|\r|\n|\./);
	studs = studs.filter(function(el) {
		return el != null && el != '';
	})
	var data = [];
	var q = '';
	for (var i = 0; i < studs.length; i++) {
		let pass = generatePassword();
		data.push({
			name: studs[i],
			class: req.body.class,
			password: pass,
			class: req.body.classValue
		});
		q += '("' + studs[i] + '", "' + pass + '",' + req.body.id + ', "' + req.body.class + '" ),';
	// q += '("' + studs[i] + '", "' + md5(pass) + '",' + session.id + ', "' + req.body.class + '" ),';
	}
	console.log("insert into students (`name`, `password`, `teacher_id`, `class_id`) values " + q.slice(0, -1))
	db.query("insert into students (`name`, `password`, `teacher_id`, `class_id`) values " + q.slice(0, -1), function(err, rows, fields) {
		if (err) {
			res.send(err);
		} else {
			res.send(data);
		}
	});
});

app.post('/createClass', (req, res) => {
	db.query("insert into classes (`number`, `letter`) values (" + req.body.number + ", '" + req.body.letter + "')", function(err, rows, fields) {
		if (err) {
			res.send(err);
		} else {
			var newClass = {
				number: req.body.number,
				letter: req.body.letter
			};
			res.send(newClass);
		}
	});
})


app.post('/changestudent', (req, res) => {
	var q = '';
	if (req.body.attr == "class") {
		q = " `class_id`=" + req.body.value + " where `id`=" + req.body.id;
	} else {
		q = " `" + req.body.attr + "`='" + req.body.value + "' where `id`=" + req.body.id;
	}
	db.query("update `students` set " + q, function(err, rows, fields) {
		if (err) {
			res.send(400, 'not changed');
		} else {
			res.send();
		}
	});
});

// append /api for our http requests
// app.use('/api', router);



// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));