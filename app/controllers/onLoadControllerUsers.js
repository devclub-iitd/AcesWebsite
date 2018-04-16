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
            data.forEach(function(user) {
                var tr = document.createElement('tr');
                tr.setAttribute('class', 'bill-item');
                tr.innerHTML = "<td><button class='btn'><i class='fa fa-arrow-up' aria-hidden='true'></i></button>&nbsp;<button class='btn'><i class='fa fa-arrow-down' aria-hidden='true'></i></button></td><td>" + user.name + "</td><td>" + user.username + "</td><td>" + user.admin + "</td><td><button class='btn2 userdel' " + "id =" + user._id + ">delete user</button></td>";
                userList.append(tr);
            });
        }).then(function() {
            document.querySelectorAll('.userdel').forEach(btn => btn.addEventListener('click', function(e) {
                ajaxFunctions.ajaxRequest('GET', appUrl + '/user_del?' + 'id=' + e.target.id, function(msg) {
                    window.location.reload(true);
                });
            }));
        });
    });

})();
