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


app.post('/signin', (req, res) => {
	var q;
	if (req.body.role === 'teacher') {
		q = "`" + req.body.role + "s` where login = '" + req.body.login + "' and password='" + md5(req.body.password) + "'";
	} else {
		q = "`" + req.body.role + "s`, `classes`  where name = '" + req.body.login + "' and password='" + req.body.password + "' and classes.id=class_id";
	}
	console.log("select * from " + q)
	db.query("select * from " + q, function(err, rows, fields) {
		if (err) {
			res.send(err);
		} else if (!rows[0]) {
			res.status(404).send({
				'error': "User not found"
			});
		} else {
			var user = {
				id: rows[0].id,
				name: rows[0].name,
				login: rows[0].login,
				school: rows[0].school,
				class: rows[0].class_id ? rows[0].number + ' ' + rows[0].letter : undefined
			};
			var token = jwt.sign(user, 'geography', {
				expiresIn: 10000
			});
			res.send(token);
		}
	});
});


app.post('/signup', (req, res) => {
	db.query("select * from teachers where login='" + req.body.login + "' and password='" + md5(req.body.password) + "'", function(error, rowss, fieldss) {
		if (error) {
			res.send(error);
		} else {
			if (rowss.length > 1) {
				db.query("insert into teachers (`name`, `login`, `password`, `school`) values ('" + req.body.name + "', '" + req.body.login + "', '" + md5(req.body.password) + "', '" + req.body.school + "')", function(err, rows, fields) {
					if (err) {
						res.send(err);
					} else {
						var newUser = {
							name: req.body.name,
							login: req.body.login,
							school: req.body.school
						};
						res.send(newUser);
					}
				});
			} else {
				res.status(304).send({
					'error': "User already exists"
				});
			}
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
	db.query("select students.id as id, students.name as name, students.password as password, classes.number as number, classes.letter as letter, classes.id as classId from `students`, `classes` where `teacher_id`=" + req.query.id + " and students.class_id=classes.id", function(err, rows, fields) {
		if (err) {
			res.send(err);
		} else {
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


app.get('/results', (req, res) => {
	var last = req.query.last ? ' order by id desc limit 6' : ''
	db.query("select results.id as id, students.name as name, results.type as type, results.result as result, classes.number as number, classes.letter as letter, classes.id as classId from `students`, `classes`, `results` where `teacher_id`=" + req.query.id + " and students.class_id=classes.id and results.student_id=students.id" + last, function(err, rows, fields) {
		if (err) {
			res.send(err);
		} else {
			var results = [];
			for (var i = 0; i < rows.length; i++) {
				results.push({
					id: rows[i].id,
					name: rows[i].name,
					type: rows[i].type,
					class: rows[i].number + ' ' + rows[i].letter,
					classId: rows[i].classId,
					result: rows[i].result
				})
			}
			res.send(results);
		}
	});
});


app.get('/studentresults', (req, res) => {
	db.query("select results.id as id, students.name as name, results.type as type, results.result as result from `students`, `results` where `student_id`=" + req.query.id + " and results.student_id=students.id", function(err, rows, fields) {
		if (err) {
			res.send(err);
		} else {
			var results = [];
			for (var i = 0; i < rows.length; i++) {
				results.push({
					id: rows[i].id,
					name: rows[i].name,
					type: rows[i].type,
					result: rows[i].result
				})
			}
			res.send(results);
		}
	});
});


app.post('/regstudents', (req, res) => {
	var studs = req.body.students.split(/,| |;|\r|\n|\./);
	studs = studs.filter(function(el) {
		return el != null && el != '';
	})
	var data = [];
	var q = '';
	for (var i = 0; i < studs.length; i++) {
		let pass = generatePassword();
		data.push({
			id: i,
			name: studs[i],
			class: req.body.class,
			password: pass,
			class: req.body.classValue
		});
		q += '("' + studs[i] + '", "' + pass + '",' + req.body.id + ', "' + req.body.class + '" ),';
	// q += '("' + studs[i] + '", "' + md5(pass) + '",' + session.id + ', "' + req.body.class + '" ),';
	}
	db.query("insert into students (`name`, `password`, `teacher_id`, `class_id`) values " + q.slice(0, -1), function(err, rows, fields) {
		if (err) {
			res.send(err);
		} else {
			res.send(data);
		}
	});
});


app.post('/createclass', (req, res) => {
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


app.post('/saveresults', (req, res) => {
	db.query("select * from `results` where student_id=" + req.body.id + " and type='" + req.body.results.name + "'", function(error, rowss, fields) {
		if (error) {
			res.send(error);
		} else {
			if (rowss.length < 1) {
				db.query("insert into results (`student_id`, `type`, `result`) values (" + req.body.id + ", '" + req.body.results.name + "', '" + req.body.results.sum + "')", function(err, rows, fields) {
					if (err) {
						res.send(err);
					} else {
						var result = {
							id: req.body.id,
							type: req.body.results.name,
							res: req.body.results.sum
						};
						res.send(result);
					}
				});
			} else {
				res.status(304).send({
					'error': "Test has already been passed"
				});
			}
		}
	});
})

// append /api for our http requests
// app.use('/api', router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));