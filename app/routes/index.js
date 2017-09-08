'use strict';

var path = process.cwd();
var contactFormMailer = require('../controllers/contactFormMailer.js');
var galleryController = require('../controllers/galleryController.js');
module.exports = function(app, passport) {

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		else {
			res.redirect('/login');
		}
	}

	app.route('/')
		.get(function(req, res) {
			res.sendFile(path + '/public/index.html');
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
			res.sendFile(path + '/public/gallery.html');
		});
	app.route('/team')
		.get(function(req, res) {
			res.sendFile(path + '/public/team.html');
		});
	app.route('/images')
		.get(function(req, res) {
			res.send(galleryController.readDir());
		});
};
