'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bill = new Schema({
    item : String,
    event: String,
    date: String,
    amount: Number,
    uploader: String,
    reimbursed: String,
    billImagePath: String
});

module.exports = mongoose.model('Bill', Bill);