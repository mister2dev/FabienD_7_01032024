const db = require("../config/db");
const { moderateText } = require("../services/moderationServicePerspective");

async function moderateTextContent(content, res) {
  const moderationResult = await moderateText(content);
  console.log("Résultat de la modération :", moderationResult);

  toxicity =
    moderationResult.attributeScores?.TOXICITY?.summaryScore?.value ?? 0;

  if (toxicity > 0.3) {
    res.status(400).json({
      message: "Votre message contient un langage inapproprié.",
    });
    return false;
  }
  return true;
}

exports.createComment = async (req, res) => {
  const { user_id, post_id, content } = req.body;

  try {
    const isContentValid = await moderateTextContent(content, res);
    if (!isContentValid) return; // Stoppe l'exécution si la modération échoue

    // Si la modération est ok, on insère le post dans la base de données
    const sql = `
      INSERT INTO comments (user_id, post_id, content) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;
    db.query(sql, [user_id, post_id, content], (err, result) => {
      if (err) {
        res.status(404).json({ err });
        console.log(err);
        throw err;
      }
      res.status(200).json(result);
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

exports.getAllComments = (req, res) => {
  const sql = `SELECT * FROM comments`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result.rows);
  });
};

exports.getOneComment = (req, res) => {
  const comment_id = req.params.id;
  const sql = `SELECT * FROM comments WHERE comments.post_id = $1`;
  db.query(sql, [comment_id], (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result.rows);
  });
};

exports.updateComment = async (req, res, next) => {
  const comment_id = req.params.id;
  const content = req.body.content;
  console.log("comment_id", content);

  try {
    const isValid = await moderateTextContent(content, res);
    if (!isValid) return; // Stopper l'exécution si le texte est toxique

    const sql = `UPDATE comments SET content = $1 WHERE id = $2;`;

    db.query(sql, [content, comment_id], (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      if (result) {
        res.status(200).json(result);
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

exports.deleteOneComment = (req, res) => {
  const comment_id = req.params.id;
  const sql = `DELETE FROM comments WHERE comments.id = $1`;
  db.query(sql, [comment_id], (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};
