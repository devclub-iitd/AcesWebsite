'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	name : String,
	username: String,
	password: String,
	admin: Boolean,
	fbid: String,
	email: String,
	imagepath: String,
	role: String,
	order: Number
});

module.exports = mongoose.model('User', User);
