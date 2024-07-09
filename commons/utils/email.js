const nodemailer = require('nodemailer');
require('dotenv').config({ path: './config/dev.env' });

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    host:"smtp.gmail.com",
    auth: {
      user: 'hnxta843@gmail.com',
      pass: process.env.GMAILPASS
    },
    tls: {
        rejectUnauthorized: false,
      },
  });

  const sendEmail = async(to, subject, text) => {
    const mailOptions = {
      from: 'hnxta843@gmail.com',
      to,
      subject,
      text,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    };

    module.exports = sendEmail;
    