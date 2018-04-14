'use strict';

(function() {

    var collectedList = document.querySelector('.collected-list');

    ajaxFunctions.ready(function() {

        var allWithdrawPromise = new Promise(function(resolve, reject) {

            ajaxFunctions.ajaxRequest('GET', appUrl + '/collected', function(data) {
                resolve(JSON.parse(data));
            });
        });

        allWithdrawPromise.then(function(data) {
            data.forEach(function(item) {
                var tr = document.createElement('tr');
                tr.innerHTML = "<td>" + item.name + "</td><td>" + item.purpose + "</td><td>" + item.amount + "</td>";
                collectedList.append(tr);

            });
        });
    });

})();
