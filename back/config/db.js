const mysql = require("mysql2");

// Creation de la connexion mySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "azermysql123&",
  database: "groupomania",
});

module.exports.getDB = () => {
  return db;
};
