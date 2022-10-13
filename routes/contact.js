const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PW,
  },
  logger: true
});

module.exports = (db) => {
  router.get('/:email', (req, res) => {
    db.query(`SELECT products.*, users.email, users.user_name FROM products
              JOIN users ON users.id = seller_id
              LIMIT 12;`)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message);
      })
      .then(products => {
        const features = products.filter(e => e.featured);
        const templateVars = { cards: products, featured: features.slice(0, 3), card_id: req.params.email, layout: false };
        res.render('contact', templateVars)
      })
  });

  router.post('/:email', (req, res) => {
    var mailOptions = {
      from: req.body.mail,
      to: req.params.email,
      subject: 'Inquiry about your art',
      text: req.body.text
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.redirect('/acclaim')
      }
    });

  });

  return router;
};
