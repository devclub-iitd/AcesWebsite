'use strict';

var User = require('../models/users.js');
var bcrypt = require('bcrypt');
var fs = require('fs');
const saltRounds = 10;
var logger = require('../../logger');

module.exports = {

    addUser: function(data, path) {
        bcrypt.hash(data.password, saltRounds, function(err, hash) {
            if (err) throw err;
            var newUser = new User();
            newUser.name = data.name;
            newUser.username = data.username;
            newUser.password = hash;
            if (data.admin == 'on')
                newUser.admin = true;
            else
                newUser.admin = false;
            newUser.fbid = data.fb;
            newUser.email = data.email;
            newUser.imagepath = path;
            newUser.role = data.role;
            newUser.save(function(err) {
                if (err) {
                    throw err;
                }
            });
        });
    },

    allUsers: function() {
        return new Promise(function(resolve, reject) {
            User.find(function(err, docs) {
                if (err) console.error(err);
                resolve(docs);
            });
        });
    },

    deleteUser: function(user_id) {
        User.findOneAndRemove({ _id: user_id }, function(err, doc) {
            if (err) console.error(err);
            logger.info('Deleted User= ' + doc.username);
            fs.unlink("./public" + doc.imagepath, function(err){
                if(err) console.log(err);
            });
            console.log(doc);
        });
    },

    findUser: function(data) {
        return new Promise(function(resolve, reject) {
            User.findOne({ 'username': data.username }, function(err, doc) {
                if (err) throw err;
                if (!doc) {
                    reject("User not found");
                }
                else {
                    bcrypt.compare(data.password, doc.password, function(err, res) {
                        if (err) throw err;
                        if (res == true) resolve(doc);
                        else reject("Incorrect password");
                    });
                }
            });
        });
    }
};
