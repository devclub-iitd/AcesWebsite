'use strict';

var path = process.cwd();
var contactFormMailer = require('../controllers/contactFormMailer.js');
var galleryController = require('../controllers/galleryController.js');
var unzip = require('unzip');
var billController = require('../controllers/billController.js');
var userController = require('../controllers/userController.js');

module.exports = function(app, fs) {

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		else {
			res.redirect('/login');
		}
	}

	// Authentication and Authorization Middleware
	var auth = function(req, res, next) {
		if (req.session && req.session.user)
			return next();
		else
			return res.redirect('/login');
	};

	var adminAuth = function(req, res, next) {
		if(req.session && req.session.admin)	
			return next();
		else
			return res.redirect('/login');
	};

	app.route('/')
		.get(function(req, res) {
			res.render(path + '/public/index');
		})
		.post(function(req, res) {
			//console.log(req.body);
			contactFormMailer.mailOptions["subject"] = 'MESSAGE FROM WEBSITE: ' + contactFormMailer.escapeHtml(req.body["subject"]);
			contactFormMailer.mailOptions["html"] = "<br /><p>" + contactFormMailer.escapeHtml(req.body["message"]) + "</p><br /><span>From :</span><br /><span>  " +
				contactFormMailer.escapeHtml(req.body["name"]) + "</span><br /><span>  " + contactFormMailer.escapeHtml(req.body["email"]) + "</span>";
			res.sendStatus(200);

			//contactFormMailer.sendFeedback();
			//res.redirect('/public/index.html');
		});
	app.route('/gallery')
		.get(function(req, res) {
			res.render(path + '/public/gallery');
		});
	app.route('/team')
		.get(function(req, res) {
			res.render(path + '/public/team');
		});
	app.route('/events')
		.get(function(req, res){
			res.render(path + '/public/events');
		});
	app.route('/images')
		.get(function(req, res) {
			res.send(galleryController.readDir());
		});
	app.route('/login')
		.get(function(req, res) {
			res.sendFile(path + '/public/login.html');
		})
		.post(function(req, res) {
			if (!req.body.username || !req.body.password) {
				res.send('login failed');
			}
			else if (req.body.username === "admin" && req.body.password === "admin") {
 				req.session.user = "admin";
 				req.session.admin = true;
 				res.redirect('/admin');
			}
			else {
				userController.findUser(req.body).then(function(user) {
					req.session.user = user.username;
					req.session.admin = user.admin;
					if (user.admin) res.redirect('/admin');
					else res.redirect('/user');
				}, function(msg) {
					res.send(msg);
				});
			}
		});
	app.route('/admin')
		.get(adminAuth, function(req, res) {
			res.render(path + '/public/admin');
		});
	app.route('/logout')
		.get(auth, function(req, res) {
			req.session.destroy();
			res.redirect('/login');
		});
	app.route('/pics')
		.post(auth, function(req, res) {
			if (Object.keys(req.files).length === 0 && req.files.constructor === Object)
				return res.status(400).send('No files were uploaded.');
			req.files.file.mv(path + '/public/img/events/uploaded', function(err) {
				if (err)
					return res.status(500).send(err);
				fs.createReadStream(path + '/public/img/events/uploaded').pipe(unzip.Extract({ path: path + '/public/img/events/' }));
				res.send('File uploaded!');
			});
		});
	app.route('/bills')
		.post(auth, function(req, res) {
			if (Object.keys(req.files).length === 0 && req.files.constructor === Object)
				return res.status(400).send('No files were uploaded.');
			req.files.bill.mv(path + '/public/bills/' + req.body.event + '_' + req.files.bill.name, function(err) {
				if (err)
					return res.status(500).send(err);
				billController.addBill(req.body, '/bills/' + req.body.event + '_' + req.files.bill.name);
				res.send('Bill uploaded!');
			});
		})
		.get(adminAuth, function(req, res) {
			billController.allBills().then(function(docs) {
				res.send(docs);
			});
		});
	app.route('/update')
		.get(adminAuth, function(req, res) {
			billController.deleteBill(req.query.id);
			res.send("deleted...");
		})
		.post(adminAuth, function(req, res) {
			billController.updateBill(req.body.bill_id);
			res.send("updated...");
		});
	app.route('/users')
		.get(adminAuth, function(req, res) {
			userController.allUsers().then(function(docs) {
				var users = docs;
				users.password = '';
				res.send(users);
			});
		})
		.post(adminAuth, function(req, res) {
			userController.addUser(req.body);
			res.redirect('/admin');
		});
	app.route('/user_del')
		.get(adminAuth, function(req, res) {
			userController.deleteUser(req.query.id);
			res.send("deleted...");
		});
	app.route('/user')
		.get(auth, function(req, res) {
			res.render(path + '/public/user');
		});
};
