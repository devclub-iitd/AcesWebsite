'use strict';

var Withdraw = require('../models/withdrawRequests.js');
var bankController = require('./bankController.js');

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

    deleteRequest: function(user_id) {
        Withdraw.findOneAndRemove({ _id: user_id }, function(err, doc) {
            if (err) console.error(err);
            console.log(doc);
        });
    },

    updateRequest: function(id) {
        Withdraw.findOneAndUpdate({ _id: id }, { $set: { stat: "approved" } }, { new: true }, function(err, doc) {
            if (err) console.error(err);
            bankController.updateAmount(doc.amount * -1);
        });
    },
};
