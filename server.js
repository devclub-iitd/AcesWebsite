'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var nodemailer = require('nodemailer');

var app = express();
require('dotenv').load();
// require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use('/', express.static(process.cwd() + '/public'))
app.use('.', express.static(process.cwd()));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

// app.use(passport.initialize());
// app.use(passport.session());

// Code for nodeMailer
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'feedback.acesacmiitd@gmail.com',
        pass: 'Ui98n$sN!' // The password is at server side and is not visible to the client
    }
});

var mailOptions = {
    from: 'feedback.acesacmiitd@gmail.com',
    to: 'feedback.acesacmiitd@gmail.com',
    subject: 'MESSAGE FROM WEBSITE',
	html: 'Empty Feedback'
};

function sendFeedback(){
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}

/* NEVER TRUST THE USER FOR INPUT #SECURITY */
/* ESCAPES "<script>alert("You are hacked!!")</script>" these types of inputs */
function escapeHtml(text) {
	var map = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#039;'
	};
  
	return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
  
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.post('/', function(req, res) {
	//console.log(req.body);
	mailOptions["subject"] = 'MESSAGE FROM WEBSITE: ' + escapeHtml(req.body["subject"]);
	mailOptions["html"] = "<br /><p>" + escapeHtml(req.body["message"]) + "</p><br /><span>From :</span><br /><span>  "
						   + escapeHtml(req.body["name"]) + "</span><br /><span>  " + escapeHtml(req.body["email"]) + "</span>";
	res.sendStatus(200);
	sendFeedback();
});

 routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
