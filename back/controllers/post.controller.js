const db = require("../config/db");
const cloudinary = require("../services/cloudinaryConfig");
const { moderateText } = require("../services/moderationServicePerspective");
const { validateSauceImage } = require("../services/moderationServiceClarifai");

// Fonction utilitaire pour supprimer une image sur Cloudinary
async function deleteImage(imageUrl) {
  const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];
  await cloudinary.uploader.destroy(publicId);
}

exports.createPost = async (req, res, next) => {
  const { user_id, content, video } = req.body;
  let file = null;

  if (req.file) {
    file = req.file.path;
  }

  try {
    // Appel de la fonction de modération
    const moderationResult = await moderateText(content);

    // Récupérer les scores de toxicité et autres
    console.log("Résultat de la modération :", moderationResult);

    const toxicity =
      moderationResult.attributeScores.TOXICITY.summaryScore.value;

    // Si la toxicité est trop élevée, on rejette le post
    if (toxicity > 0.3) {
      console.log("Score de toxicité :", toxicity);
      return res
        .status(400)
        .json({ message: "Votre message contient un langage inapproprié." });
    }

    // Si la modération est ok, on insère le post dans la base de données
    const post = [user_id, content, file, video];
    const sql =
      "INSERT INTO posts (user_id, content, attachment, video) VALUES ($1, $2, $3, $4)";

    db.query(sql, post, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la création du post." });
      } else {
        res.status(201).json({ message: "Votre message a bien été posté !" });
      }
    });
  } catch (error) {
    console.error(
      "Erreur dans le processus de modération ou lors de l'insertion :",
      error.message
    );
    res
      .status(500)
      .json({ error: "Erreur interne, veuillez réessayer plus tard." });
  }
};

exports.getAllPosts = (req, res, next) => {
  const sql = "SELECT * FROM posts ORDER BY created_at DESC";

  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result.rows);
  });
};

exports.getOnePost = (req, res, next) => {
  const postId = req.params.id;
  const sql = `SELECT * FROM posts WHERE id = ${postId};`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result.rows);
  });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.id;
  const content = req.body.content;
  //const sql = `UPDATE posts SET content = "${content}" WHERE id = ${postId};`;

  //  let file = null;
  let file =
    req.body.file ||
    (req.file &&
      `${req.protocol}://${req.get("host")}/images/${req.file.filename}`);
  console.log("request", req.body);
  // if (req.body.file) {
  //   file = req.body.file;
  // }
  // if (req.file) {
  //   file = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  // }
  console.log("file", file);
  const sql = "UPDATE posts SET content = $1, attachment = $2 WHERE id = $3";

  db.query(sql, [content, file, postId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour du post :", err);
      return res.status(404).json({ err });
    }
    if (result) {
      return res.status(200).json(result);
    }
  });
};

exports.deleteOnePost = (req, res, next) => {
  const post_id = req.params.id;
  const selectSql = "SELECT attachment FROM posts WHERE id = $1";

  db.query(selectSql, [post_id], (err, result) => {
    const attachmentUrl = result.rows[0].attachment;

    if (attachmentUrl) {
      deleteImage(attachmentUrl);
      deletePostFromDb(post_id);
    } else {
      deletePostFromDb(post_id);
    }
  });

  function deletePostFromDb(post_id) {
    const sql = `DELETE FROM posts WHERE id = ${post_id}`;

    db.query(sql, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).json(result);
    });
  }
};
