'use strict';

var nodemailer = require('nodemailer');

module.exports = {
    // Code for nodeMailer
    transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'feedback.acesacmiitd@gmail.com',
            pass: 'Ui98n$sN!' // The password is at server side and is not visible to the client
        }
    }),

    mailOptions: {
        from: 'feedback.acesacmiitd@gmail.com',
        to: 'feedback.acesacmiitd@gmail.com',
        subject: 'MESSAGE FROM WEBSITE',
        html: 'Empty Feedback'
    },

    sendFeedback: function() {
        this.transporter.sendMail(this.mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    },

    /* NEVER TRUST THE USER FOR INPUT #SECURITY */
    /* ESCAPES "<script>alert("You are hacked!!")</script>" these types of inputs */
    escapeHtml: function(text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };

        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }
};
