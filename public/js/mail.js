var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'feedback.acesacmiitd@gmail.com',
        pass: 'Ui98n$sN!' // currently hard-coded and publicly visible, to be removed later
    }
});

var mailOptions = {
    from: 'feedback.acesacmiitd@gmail.com',
    to: 'feedback.acesacmiitd@gmail.com',
    subject: 'MESSAGE FROM WEBSITE',
    text: 'sending my feedback'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

function processFeedback() {
    console.log("processing");
}