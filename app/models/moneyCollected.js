'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Collected = new Schema({
    name: String,
    amount: Number,
    purpose: String
});

module.exports = mongoose.model('Collected', Collected);