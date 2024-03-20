const db_config = require("../config/db");
const db = db_config.getDB();

// CRUD post

exports.createPost = (req, res, next) => {
  const { user_id, title, content } = req.body;
  let file = null;

  if (req.file) {
    console.log(req.file);
    // Vérifier l'extension du fichier
    if (
      req.file.mimetype != "image/jpg" &&
      req.file.mimetype != "image/png" &&
      req.file.mimetype != "image/jpeg"
    ) {
      return res
        .status(400)
        .json({ error: "Le fichier doit être au format JPG, JPEG ou PNG." });
    }

    // Vérifier la taille du fichier
    else if (req.file.size > 500000) {
      return res
        .status(400)
        .json({ error: "Le fichier ne doit pas dépasser 500 ko." });
    }
    file = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  const post = [user_id, title, content, file];
  const sql =
    "INSERT INTO posts (user_id, title, content, picture) VALUES (?, ?, ?, ?)";

  db.query(sql, post, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la création du post." });
    } else {
      res.status(201).json({ message: "Votre message a bien été posté !" });
    }
  });
};

exports.getAllPosts = (req, res, next) => {
  const sql = "SELECT * FROM posts";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
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
    res.status(200).json(result);
  });
};

exports.updatePost = (req, res, next) => {
  const userId = req.params.id;
  const content = req.body.content;
  const sql = `UPDATE posts SET content = "${content}" WHERE id = ${userId};`;

  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result) {
      res.status(200).json(result);
    }
  });
};

exports.deleteOnePost = (req, res, next) => {
  const post_id = req.params.id;
  const sql = `DELETE FROM posts WHERE id = ${post_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

// exports.getOneImage = (req, res, next) => {
//   const { id: postId } = req.params;
//   const sql = `SELECT * FROM posts WHERE post.id = ${postId};`;
//   db.query(sql, (err, result) => {
//     if (err) {
//       res.status(404).json({ err });
//       throw err;
//     }
//     if (result[0]) {
//       result[0].picture =
//         req.protocol + "://" + req.get("host") + "/images/" + result[0].picture;
//     }
//     res.status(200).json(result);
//   });
// };
