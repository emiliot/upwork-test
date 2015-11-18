var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var dotenv = require('dotenv');
var jwt = require('express-jwt');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

dotenv.load();
var authenticate = jwt({
	secret : new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
	audience : process.env.AUTH0_CLIENT_ID
});

var app = express();

// database connection test
mongoose.connect('mongodb://emiliot:upwork-test@ds033153.mongolab.com:33153/upwork-test')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log('good');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', authenticate, users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
