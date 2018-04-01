'use strict';

var Bank = require('../models/bank.js');
var logger = require('../../logger');

module.exports = {
    getAmount: function() {
        return new Promise(function(resolve, reject) {
            Bank.findOne({ name: 'aces' }, function(err, doc) {
                if (err) throw err;
                if (!doc) {
                    var newBank = new Bank();
                    newBank.name = 'aces';
                    newBank.amount = 0;
                    logger.info('New bank account created');
                    newBank.save(function(err) {
                        if (err) {
                            throw err;
                        }
                        else {
                            resolve(0);
                        }
                    });
                }
                else {
                    console.log(doc);
                    resolve(doc.amount);
                }
            });
        });
    },
    updateAmount: function(incr) {
        Bank.findOne({ 'name': 'aces' }, function(err, doc) {
            if (err) throw err;

            var newAmount = doc.amount + incr;
            Bank.findOneAndUpdate({ 'name': 'aces' }, { $set: { amount: newAmount } }, function(err, doc) {
                if (err) console.error(err);
                logger.info('Bank Balance changed by: ' + Number(incr));
                logger.info('New balance: ' + Number(newAmount));
            });

        });
    },
};
