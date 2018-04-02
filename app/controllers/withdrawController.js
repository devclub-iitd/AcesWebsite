'use strict';

var Withdraw = require('../models/withdrawRequests.js');

module.exports = {

    addWithdraw: function(data, name) {
            var newWithdraw = new Withdraw();
            newWithdraw.name = name;
            newWithdraw.purpose = data.purpose;
            newWithdraw.stat = 'pending';
            newWithdraw.amount = data.amount;
            newWithdraw.save(function(err) {
                if (err) {
                    throw err;
                }
            });
    },

    allWithdraw: function() {
        return new Promise(function(resolve, reject) {
            Withdraw.find(function(err, docs) {
                if (err) console.error(err);
                resolve(docs);
            });
        });
    },

};
