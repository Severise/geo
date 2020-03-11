const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken')


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


var user;

// function authentication() {
// 	return function(req, res, next) {
// 		console.log(req.body.user);
// 		if (req.isAuthenticated())
// 			return next();
// 		res.redirect('/login');
// 	}
// }

// passport.use(new LocalStrategy({ usernameField: 'login', passwordField: 'password' },
// 	function(login, password, done) {
// 		console.log("select * from " + role + " where login = '" + login + "' and password='" + md5(password) + "'");
// 		db.query("select * from teachers where login = '" + login + "' and password='" + md5(password) + "'", function(err, rows, fields) {
// 			if (rows[0]) {
// 				if (err)
// 					throw err;
// 				user = rows[0];
// 				return done(null, user);
// 			} else
// 				return done(null, false);
// 		});
// 	}
// ));  

app.post('/login', (req, res) => {
    console.log(req.body);
    var q;

    if (req.body.role === 'teacher')
        q = req.body.role + "s where login = '" + req.body.login + "' and password='" + md5(req.body.password) + "'";
    else
        q = req.body.role + "s where login = '" + req.body.login + "' and password='" + req.body.password + "'";
    db.query("select * from " + q, function(err, rows, fields) {
        if (err)
            res.send(err);
        else if (!rows[0])
            res.status(404).send({ 'error': "User not found" });
        else {
            user = {
                id: rows[0].id,
                name: rows[0].name,
                login: rows[0].login,
                school: rows[0].school,
                class: rows[0].class
            };
            var token = jwt.sign(user, 'secret', {
                expiresIn: 1440
            });
            res.send({ token: token, user: user });
        }
    });

});


app.get('/logout', (req, res) => {
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
    console.log("")
    db.query("select id, number, letter from `classes`", function(err, rows, fields) {
        if (err)
            throw err;
        else {
            var classes = [];
            for (var i = 0; i < rows.length; i++)
                classes.push({
                    id: rows[i].id,
                    class: rows[i].number+' '+rows[i].letter
                })
            console.log(classes)

            res.send(classes);

        }
    });

});


app.get('/students', (req, res) => {
    console.log("")
    db.query("select students.id as id, students.name as name, students.password as password, classes.number as number, classes.letter as letter  from `students`, `classes` where `teacher_id`=" + req.query.teacherId + " and students.class_id=classes.id", function(err, rows, fields) {
        if (err)
            throw err;
        else {
            var studs = [];
            for (var i = 0; i < rows.length; i++)
                studs.push({
                    id: rows[i].id,
                    name: rows[i].name,
                    password: rows[i].password,
                    class: rows[i].number + ' ' + rows[i].letter
                })
            // console.log(studs)

            res.send(studs);

        }
    });

});


app.post('/regstudents', (req, res) => {
    console.log(req.body)
    var studs = req.body.students.split(/,| |;|\r|\n|\./);
    studs = studs.filter(function(el) {
        return el != null && el != '';
    })
    // var data = [];
    var q = '';
    for (var i = 0; i < studs.length; i++) {
        let pass = generatePassword();
        // data.push({ name: studs[i], class: req.body.class, password: pass });
        q += '("' + studs[i] + '", "' + pass + '",' + session.id + ', "' + req.body.class + '" ),';
        // q += '("' + studs[i] + '", "' + md5(pass) + '",' + session.id + ', "' + req.body.class + '" ),';
    }
    db.query("insert into students  (`name`, `password`, `teacher_id`, `class_id`) values " + q.slice(0, -1), function(err, rows, fields) {
        if (err)
            throw err;
        else
            res.redirect('/teacher');
    });
})

app.post('/changestudent', (req, res) => {
    console.log(req.body);
    var q = " `" + req.body.attr + "`='" + req.body.value + "' where `id`=" + req.body.id;
    db.query("update `students` set " + q, function(err, rows, fields) {
        if (err)
            res.send(400, 'not changed');

        else {
            // console.log(rows);
            res.send();
        }
    });
});

// append /api for our http requests
// app.use('/api', router);


// passport.serializeUser(function(user, done) {
// 	console.log('serializeUser');
// 	done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
// 	connection.query("select * from teachers where id = '" + id + "'", function(err, rows, fields) {
// 		if (err)
// 			throw err;
// 		user = { id: rows[0].id, name: rows[0].name, login: rows[0].login };
// 		session.login = user.login;
// 		session.id = user.id;
// 		return done(null, user);
// 	});
// });

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));