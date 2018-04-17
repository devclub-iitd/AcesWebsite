'use strict';

(function() {

    var userList = document.querySelector('.user-list');

    ajaxFunctions.ready(function() {

        var allUsersPromise = new Promise(function(resolve, reject) {

            ajaxFunctions.ajaxRequest('GET', appUrl + '/users', function(data) {
                resolve(JSON.parse(data));
            });
        });

        allUsersPromise.then(function(data) {
            data.sort(function(a, b) {
                return a.order - b.order;
            }).forEach(function(user) {
                console.log(user.order);
                var tr = document.createElement('tr');
                tr.setAttribute('class', 'bill-item');
                tr.setAttribute('id', user._id);
                tr.innerHTML = "<td><button class='btn-primary'><i class='fa fa-arrow-up up' aria-hidden='true'></i></button>&nbsp;<button class='btn-primary '><i class='fa fa-arrow-down down' aria-hidden='true'></i></button></td><td>" + user.name + "</td><td>" + user.username + "</td><td>" + user.admin + "</td><td><button class='btn2 userdel' >delete user</button></td>";
                userList.append(tr);
            });
        }).then(function() {
            document.querySelectorAll('.userdel').forEach(btn => btn.addEventListener('click', function(e) {
                console.log(e.target.parentElement.parentElement.id);
                ajaxFunctions.ajaxRequest('GET', appUrl + '/user_del?' + 'id=' + e.target.parentElement.parentElement.id, function(msg) {
                    window.location.reload(true);
                });
            }));
            document.querySelectorAll('.up').forEach(btn => btn.addEventListener('click', function(e) {
                console.log(e.target.parentElement.parentElement.parentElement.id);
                ajaxFunctions.ajaxRequest('GET', appUrl + '/moveup?' + 'id=' + e.target.parentElement.parentElement.parentElement.id, function(msg) {
                    window.location.reload(true);
                });
            }));

            document.querySelectorAll('.down').forEach(btn => btn.addEventListener('click', function(e) {
                console.log(e.target.parentElement.parentElement.parentElement.id);
                ajaxFunctions.ajaxRequest('GET', appUrl + '/movedown?' + 'id=' + e.target.parentElement.parentElement.parentElement.id, function(msg) {
                    window.location.reload(true);
                });
            }));
        });
    });

})();
