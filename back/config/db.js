const mysql = require("mysql2");
require("dotenv").config();

// Creation de la connexion mySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

module.exports.getDB = () => {
  return db;
};
