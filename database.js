require("dotenv").config();
const { query } = require("express");
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const filterProducts = function(city, minprice, maxprice) {
  let initialQuery = 'SELECT products.*, users.email, users.user_name FROM products JOIN users ON users.id = seller_id'
  let queryArr = [];

  if (city) {
    queryArr.push(city)
    initialQuery += ` WHERE city = $${queryArr.length} AND sold = false`;
  }

  if (minprice && maxprice) {
    queryArr.push(minprice);
    initialQuery += ` AND price >= $${queryArr.length}`;
    queryArr.push(maxprice);
    initialQuery += ` AND price <= $${queryArr.length}`;
  }

  console.log(initialQuery, queryArr);
  return db

    .query(initialQuery, queryArr)
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log(error.message);
    })
}
exports.filterProducts = filterProducts;
