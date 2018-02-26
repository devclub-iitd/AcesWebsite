'use strict';

(function() {

    var billList = document.querySelector('.bill-list');
    var total = document.getElementById('total');
    var reimburse = document.getElementById('reimburse');
    ajaxFunctions.ready(function() {

        var allBillsPromise = new Promise(function(resolve, reject) {

            ajaxFunctions.ajaxRequest('GET', appUrl + '/bills', function(data) {
                resolve(JSON.parse(data));
            });
        });

        allBillsPromise.then(function(data) {
            var totalExpenditure = 0;
            var amountToBeReimbursed = 0;
            data.forEach(function(bill) {
                var tr = document.createElement('tr');
                totalExpenditure += Number(bill.amount);
                if(bill.reimbursed == 'No') amountToBeReimbursed += Number(bill.amount);
                tr.setAttribute('class', 'bill-item');
                tr.innerHTML = "<td>" + bill.item + "</td><td>" + bill.event + "</td><td>" + bill.date + "</td><td>" + bill.amount + "</td><td>" + bill.uploader + "</td><td>" + bill.reimbursed + "</td><td><button class='btn2 reimb' " + "id=#" + bill._id + ">mark reimbursed</button></td><td><button class='btn2 del' " + "id =" + bill._id + ">delete bill</button></td><td><a href=" + bill.billImagePath + "><button class='btn2'>Download Bill</button></a>";
                billList.append(tr);
            });
            total.innerHTML = 'Total expenditure = ' + totalExpenditure;
            reimburse.innerHTML = 'Amount to be reimbursed = ' + amountToBeReimbursed;
        }).then(function() {
            document.querySelectorAll('.del').forEach(btn => btn.addEventListener('click', function(e) {
                ajaxFunctions.ajaxRequest('GET', appUrl + '/update?' + 'id=' + e.target.id, function(msg) {
                    window.location.reload(true);
                });
            }));
            document.querySelectorAll('.reimb').forEach(btn => btn.addEventListener('click', function(e) {
                ajaxFunctions.ajaxPostRequest({ bill_id: e.target.id.slice(1) }, appUrl + '/update', function(msg) {
                    window.location.reload(true);
                });
            }));
        });
    });

})();
