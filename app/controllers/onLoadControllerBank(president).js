'use strict';

(function() {

    var pendingList = document.querySelector('.pending-list');
    var approvedList = document.querySelector('.approved-list');

    ajaxFunctions.ready(function() {

        var allWithdrawPromise = new Promise(function(resolve, reject) {

            ajaxFunctions.ajaxRequest('GET', appUrl + '/withdraw', function(data) {
                resolve(JSON.parse(data));
            });
        });

        allWithdrawPromise.then(function(data) {
            data.forEach(function(item) {
                var tr = document.createElement('tr');
                if (item.stat == 'pending') {
                    tr.innerHTML = "<td>" + item.name + "</td><td>" + item.purpose + "</td><td>" + item.amount + "</td><td><button class='btn2 appr' " + "id=#" + item._id + ">mark approved</button></td><td><button class='btn2 delr' " + "id =" + item._id + ">delete request</button></td>";

                    pendingList.append(tr);
                }
                else {
                    tr.innerHTML = "<td>" + item.name + "</td><td>" + item.purpose + "</td><td>" + item.amount + "</td>";
                    approvedList.append(tr);
                }
            });
        }).then(function() {
            document.querySelectorAll('.delr').forEach(btn => btn.addEventListener('click', function(e) {
                ajaxFunctions.ajaxRequest('GET', appUrl + '/bank?' + 'id=' + e.target.id, function(msg) {
                    window.location.reload(true);
                });
            }));
            document.querySelectorAll('.appr').forEach(btn => btn.addEventListener('click', function(e) {
                ajaxFunctions.ajaxPostRequest({ id: e.target.id.slice(1) }, appUrl + '/president', function(msg) {
                    window.location.reload(true);
                });
            }));
        });
    });

})();
