'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Withdraw = new Schema({
    name: String,
    amount: Number,
    stat: String,
    purpose: String
});

module.exports = mongoose.model('Withdraw', Withdraw);