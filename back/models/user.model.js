const connection = require("../config/db");

const User = {
  create: (email, password, callback) => {
    const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
    connection.query(sql, [email, password], (erreur, resultat) => {
      if (erreur) {
        return callback(erreur);
      }
      callback(null, resultat.insertId);
    });
  },

  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    connection.query(sql, [email], (erreur, resultat) => {
      if (erreur) {
        return callback(erreur);
      }
      if (resultat.length === 0) {
        return callback(null, null);
      }
      callback(null, resultat[0]);
    });
  },
};

module.exports = User;
