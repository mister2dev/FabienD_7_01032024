const dbc = require("../config/db");
const db = dbc.getDB();

// CRUD comments

exports.createComment = (req, res, next) => {
  const { id, user_id, post_id, content } = req.body;
  const sql = `INSERT INTO comments (id, user_id, post_id, content) VALUES (NULL, ${user_id}, ${post_id}, "${content}")`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      console.log(err);
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getAllComments = (req, res) => {
  const post_Id = req.params.id;
  const sql = `SELECT * FROM comments`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getOneComment = (req, res) => {
  const comment_Id = req.params.id;
  const sql = `SELECT * FROM comments WHERE comments.id = ${comment_Id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.deleteOneComment = (req, res) => {
  const comment_id = req.params.id;
  const sql = `DELETE FROM comments WHERE comments.id = ${comment_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

// // exports.getProfilPicture = (req, res) => {
// //   const { id: user_id } = req.params;
// //   const sqlGetUser = `SELECT image_url FROM images WHERE images.user_id = ${user_id} ORDER BY images.image_id desc;`;
// //   db.query(sqlGetUser, (err, result) => {
// //     if (err) {
// //       res.status(404).json({ err });
// //       throw err;
// //     }
// //     res.status(200).json(result);
// //   });
// // };
