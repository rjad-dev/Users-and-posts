const nodemailer = require('nodemailer');

module.exports =  nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4476aaa530dd44",
    pass: "1b388f8288a2ee"
  }
}); 

