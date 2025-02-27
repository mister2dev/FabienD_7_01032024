const db = require("../config/db");
const fs = require("fs");
const path = require("path");

exports.getOneUser = (req, res, next) => {
  const userId = req.params.id;
  const sql = `SELECT id, username, email, is_admin FROM users WHERE id = $1`;

  db.query(sql, [userId], (err, result) => {
    console.log("resultat :", result);
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result.rows[0]);
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
    res.status(200).json(result.rows);
  });
};

exports.updateUser = (req, res, next) => {
  const userId = req.body.userId;
  const username = req.body.username;
  const email = req.body.email;
  const description = req.body.bio;

  // Construction dynamique de la requête SQL

  let sqlUpdateUser = "UPDATE users SET ";
  const params = [];
  let paramIndex = 1; // L'index de paramètre commence à 1 en PostgreSQL

  if (username) {
    sqlUpdateUser += `username = $${paramIndex}, `;
    params.push(username);
    paramIndex++;
  }
  if (email) {
    sqlUpdateUser += `email = $${paramIndex}, `;
    params.push(email);
    paramIndex++;
  }
  if (description) {
    sqlUpdateUser += `description = $${paramIndex}, `;
    params.push(description);
    paramIndex++;
  }
  sqlUpdateUser = sqlUpdateUser.slice(0, -2); // Suppression de la dernière virgule et espace
  sqlUpdateUser += ` WHERE id = $${paramIndex}`;
  params.push(userId);

  db.query(sqlUpdateUser, params, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result) {
      res.status(200).json(result);
    }
  });
};

exports.updatePicture = (req, res, next) => {
  const userId = req.body.userId;
  let file = null;

  if (req.file) {
    file = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }

  // Requête SQL pour obtenir le chemin de l'ancienne image
  const sqlGetOldImage = "SELECT attachment FROM users WHERE id = $1";

  db.query(sqlGetOldImage, [userId], (err, result) => {
    if (err) {
      res.status(500).json({ err });
      throw err;
    }

    if (result.length > 0 && result[0].attachment) {
      const oldImagePath = path.join(
        __dirname,
        "../images",
        path.basename(result[0].attachment)
      );

      // Supprimer l'ancienne image si elle existe
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Mettre à jour l'image de profil dans la base de données
    const sqlUpdateUser = "UPDATE users SET attachment = $1 WHERE id = $2";

    db.query(sqlUpdateUser, [file, userId], (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      if (result) {
        res.status(200).json({ result, file });
      }
    });
  });
};
