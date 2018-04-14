'use strict';

var Collected = require('../models/moneyCollected.js');

module.exports = {

    addCollected: function(data, name) {
        var newCollected = new Collected();
        newCollected.name = name;
        newCollected.purpose = data.purpose;
        newCollected.amount = data.amount;
        newCollected.save(function(err) {
            if (err) {
                throw err;
            }
        });
    },

    allCollected: function() {
        return new Promise(function(resolve, reject) {
            Collected.find(function(err, docs) {
                if (err) console.error(err);
                resolve(docs);
            });
        });
    },
};
