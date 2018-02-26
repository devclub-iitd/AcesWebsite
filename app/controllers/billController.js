'use strict';

var Bill = require('../models/bills.js');
var fs = require('fs');
var logger = require('../../logger');

module.exports = {
    addBill: function(data, path) {
        var newBill = new Bill();
        newBill.item = data.item;
        newBill.event = data.event;
        newBill.date = new Date(data.date).toLocaleDateString();
        newBill.amount = data.amount;
        newBill.uploader = data.uploader;
        newBill.billImagePath = path;
        newBill.reimbursed = "No";
        logger.info('New Bill= ' + path);
        newBill.save(function(err) {
            if (err) {
                throw err;
            }
        });
    },
    
    allBills: function(){
       return new Promise(function(resolve, reject){
           Bill.find(function(err, docs){
               if(err) console.error(err);
               resolve(docs);
           }); 
       });
    },
    
    deleteBill: function(bill_id){
        Bill.findOneAndRemove({_id: bill_id}, function(err, doc){
            if(err) console.error(err);
            logger.info('Deleted Bill: ' + doc.billImagePath);
            fs.unlink("./public" + doc.billImagePath, function(err){
                if(err) console.log(err);
            });
        });
    },
    
    updateBill: function(bill_id){
        Bill.findOneAndUpdate({_id: bill_id}, { $set: {reimbursed : "Yes"}}, {new: true}, function(err, doc){
            if(err) console.error(err);
            logger.info('Marked reimbursed Bill: ' + doc.billImagePath);
        });
    },
};
