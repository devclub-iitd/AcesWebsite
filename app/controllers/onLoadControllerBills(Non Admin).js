'use strict';

(function() {

    var billList = document.querySelector('.bill-list');

    ajaxFunctions.ready(function() {

        var allBillsPromise = new Promise(function(resolve, reject) {

            ajaxFunctions.ajaxRequest('GET', appUrl + '/bills', function(data) {
                resolve(JSON.parse(data));
            });
        });

        allBillsPromise.then(function(data) {
            data.forEach(function(bill) {
                var tr = document.createElement('tr');
                tr.setAttribute('class', 'bill-item');
                tr.innerHTML = "<td>" + bill.item + "</td><td>" + bill.event + "</td><td>" + bill.date + "</td><td>" + bill.amount + "</td><td>" + bill.uploader + "</td><td>" + bill.reimbursed + "</td>";
                billList.append(tr);
            });
        });
    });

})();
