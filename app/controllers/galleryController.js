'use strict';

var fs = require('fs');
var path = './public/img/events';

module.exports = {
    readDir: function() {
        var data = [];
        fs.readdirSync(path).forEach(folder => {
            if (fs.statSync(path + '/' + folder).isDirectory()){
            var dir = [];
            dir.push(folder);
            fs.readdirSync(path + '/' + folder).forEach(file=> {
                dir.push(file);
            });
            data.push(dir);
        }
        });
        return data;
    }
};
