const db_config = require("../config/db");
const db = db_config.getDB();

exports.getOneUser = (req, res, next) => {
  const userId = req.params.id;
  const sql = `SELECT id, username, email, is_admin FROM users WHERE id = ?`;

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
  const sql = `SELECT id, username, email, attachment FROM users`;

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
  const userId = req.body.userId;
  const username = req.body.username;
  const email = req.body.email;
  const description = req.body.bio;

  // const sqlUpdateUser =
  //   "UPDATE users SET username = ?, email = ?, description = ? WHERE id = ?";

  // Construction dynamique de la requête SQL
  let sqlUpdateUser = "UPDATE users SET ";
  const params = [];

  if (username) {
    sqlUpdateUser += "username = ?, ";
    params.push(username);
  }
  if (email) {
    sqlUpdateUser += "email = ?, ";
    params.push(email);
  }
  if (description) {
    sqlUpdateUser += "description = ?, ";
    params.push(description);
  }

  // Suppression de la dernière virgule et espace
  sqlUpdateUser = sqlUpdateUser.slice(0, -2);

  sqlUpdateUser += " WHERE id = ?";
  params.push(userId);

  db.query(
    sqlUpdateUser,
    params,
    //[username, email, description, userId],
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      if (result) {
        res.status(200).json(result);
      }
    }
  );
};

exports.updatePicture = (req, res, next) => {
  const userId = req.body.userId;
  let file = null;

  if (req.file) {
    file = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }

  const sqlUpdateUser = "UPDATE users SET attachment = ? WHERE id = ?";

  db.query(sqlUpdateUser, [file, userId], (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result) {
      res.status(200).json({ result, file });
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
