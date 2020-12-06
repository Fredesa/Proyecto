const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'testdeaya@gmail.com', // generated ethereal user
      pass: 'xsknxfebafxxoxcp', // generated ethereal password
    },
  });

  transporter.verify(() =>{
      
  })