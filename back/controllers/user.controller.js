const db_config = require("../config/db");
const db = db_config.getDB();

exports.getOneUser = (req, res, next) => {
  const userId = req.params.id;
  const sql = `SELECT id, username, email FROM users WHERE id = ?`;

  db.query(sql, userId, (err, result) => {
    console.log("resultat :", result);
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result[0]);
  });
};

exports.getAllUsers = (req, res, next) => {
  const sql = `SELECT id, username, email FROM users`;

  db.query(sql, (err, result) => {
    console.log("liste user :", result);
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.id;
  const username = req.body.username;
  const email = req.body.email;
  const sqlUpdateUser = `UPDATE users SET username = "${username}", email = "${email}" WHERE id = ${userId};`;

  db.query(sqlUpdateUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result) {
      res.status(200).json(result);
    }
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  const sql = `DELETE FROM users WHERE id = ?`;

  db.query(sql, userId, (err, result) => {
    if (err) {
      res.status(400).json(err);
      throw err;
    }
    res.status(200).json({ message: "Votre compte a bien été supprimé !" });
  });
};
