const express = require('express');
const router = express.Router();



module.exports = (db) => {
  router.get('/', (req, res) => {
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
        const templateVars = { cards: products, layout: false };
        res.render('post', templateVars)
      })
  });

  router.post('/', (req, res) => {
    const values = [req.body.name, req.body.photo, req.body.country, req.body.city, 2, req.body.description, req.body.prompts, req.body.price]
    const postQuery = `
          INSERT INTO products(name,photo,country,city,seller_id,description,prompts,price)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *;`
    db.query(postQuery, values)
      .then(() => {
        return res.redirect('acclaim')
      })
      .catch((err) => {
        return console.error(err.message);
      })
  });

  return router;
};
