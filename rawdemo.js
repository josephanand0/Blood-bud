var emails=['karthiksonu25@gmail.com','sathwikrachuri007@gmail.com'];
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'raktabij123@gmail.com',
    pass: 'daokvsralxexjpes'
  }
});

var mailOptions = {
  from: 'bloodbud896@gmail.com',
  to: emails,
  subject: 'Welcome to RAKTABīJ',
  text: `HI!
  Welcome to RAKTABīJ an online web application that will save many lives.
  WE congratulate you for taking part in a nobalsa deed.`,
  html:`<p>please donate blood to the recepient</p>`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
