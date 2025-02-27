const db = require("../config/db");

exports.createComment = (req, res) => {
  const { user_id, post_id, content } = req.body;
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

exports.updateComment = (req, res, next) => {
  const comment_id = req.params.id;
  const content = req.body.content;
  console.log("comment_id", content);
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
