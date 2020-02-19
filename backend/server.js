const express = require('express');
const session = require('express-session');

const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const md5 = require('md5');

const app = express();
app.use(cors());
const router = express.Router();
const API_PORT = 3001;

app.use(express.json());
app.use(session({
	secret: 'kitty',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


const mysql = require('mysql');
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'geo'
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));


var tryUser;

function authentication() {
	return function(req, res, next) {
		console.log(req.body.user);
		if (req.isAuthenticated())
			return next();
		res.redirect('/login');
	}
}

passport.use(new LocalStrategy({ usernameField: 'login', passwordField: 'password' },
	function(login, password, done) {
		console.log("select * from " + role + " where login = '" + login + "' and password='" + md5(password) + "'");
		db.query("select * from teachers where login = '" + login + "' and password='" + md5(password) + "'", function(err, rows, fields) {
			if (rows[0]) {
				if (err)
					throw err;
				tryUser = rows[0];
				return done(null, tryUser);
			} else
				return done(null, false);
		});
	}
));

app.post('/login', (req, res) => {
	console.log(req.body);
	passport.authenticate('local', {
		successRedirect: '/teacher',
		failureRedirect: '/?auth=false'
	})
});


app.get('/logout', authentication(), (req, res) => {
	req.logout();
	req.session.destroy();
	user = null;
	res.redirect('/menu');
});



app.get('/', (req, res) => {
	console.log('get//');
	res.send('home');
});


app.get('/classes', (req, res) => {
	console.log("select * from students where teacher_id=1")
	db.query("select * from `students` where `teacher_id`=1", function(err, rows, fields) {
		if (err)
			throw err;
		else {
			var studs = [];
			for (var i = 0; i < rows.length; i++)
				studs.push({
					id: rows[i].id,
					name: rows[i].name,
					password: rows[i].password,
					class: rows[i].class
				})
			// console.log(studs)

			res.send(studs);

		}
	});
	
});

app.post('/changestudent', (req, res) => {
	console.log(req.body);
	var q = " `" + req.body.attr + "`='" + req.body.value + "' where `id`=" + req.body.id;
	db.query("update `students` set " + q, function(err, rows, fields) {
		if (err)
			throw err;
		else {
			console.log(rows);
			res.send();
		}
	});
});

// append /api for our http requests
// app.use('/api', router);


passport.serializeUser(function(user, done) {
	console.log('serializeUser');
	done(null, user.id);
});

var user;
passport.deserializeUser(function(id, done) {
	connection.query("select * from teachers where id = '" + id + "'", function(err, rows, fields) {
		if (err)
			throw err;
		user = { id: rows[0].id, name: rows[0].name, login: rows[0].login };
		session.login = user.login;
		session.id = user.id;
		return done(null, user);
	});
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));