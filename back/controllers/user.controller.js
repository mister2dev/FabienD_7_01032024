const db = require("../config/db");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { moderateImage } = require("../services/moderationServiceClarifai");

async function moderateImageContent(imageUrl, res) {
  try {
    const isValidImage = await moderateImage(imageUrl);
    console.log("isValidImagefunction", isValidImage);
    if (!isValidImage) {
      await deleteImage(imageUrl);
      res.status(400).json({
        message: "L'image n'est pas appropriée.",
      });
      return false;
    }
    return true;
  } catch (error) {
    console.error("Erreur lors de la validation de l'image :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la validation de l'image." });
    return false;
  }
}

async function deleteImage(imageUrl) {
  const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];
  await cloudinary.uploader.destroy(publicId);
}

exports.getOneUser = (req, res, next) => {
  const userId = req.params.id;
  const sql = `SELECT id, username, email, is_admin FROM users WHERE id = $1`;

  db.query(sql, [userId], (err, result) => {
    // console.log("resultat :", result);
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
    // console.log("liste user :", result);
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

exports.updatePicture = async (req, res, next) => {
  const userId = req.body.userId;
  let file = null;

  if (req.file) {
    file = req.file.path;
  }

  if (file) {
    const isValidImage = await moderateImageContent(file, res);
    console.log("isValidImage", isValidImage);
    if (!isValidImage) return; // Stopper l'exécution si l'image est invalide
  }

  // Requête SQL pour obtenir le chemin de l'ancienne image
  const sqlGetOldImage = "SELECT attachment FROM users WHERE id = $1";

  db.query(sqlGetOldImage, [userId], (err, result) => {
    const attachmentUrl = result.rows[0].attachment;

    if (attachmentUrl) {
      deleteImage(attachmentUrl);
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
