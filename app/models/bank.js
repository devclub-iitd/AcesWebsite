'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bank = new Schema({
    name: String,
    amount: Number,
    
});

module.exports = mongoose.model('Bank', Bank);