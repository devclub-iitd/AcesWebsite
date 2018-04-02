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
                    tr.innerHTML = "<td>" + item.name + "</td><td>" + item.purpose + "</td><td>" + item.amount + "</td>";
                    pendingList.append(tr);
                }
                else {
                    tr.innerHTML = "<td>" + item.name + "</td><td>" + item.purpose + "</td><td>" + item.amount + "</td>";
                    approvedList.append(tr);
                }
            });
        });
    });

})();
