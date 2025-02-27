const db_config = require("../config/db");
const db = db_config.getDB();

const sql_like = "INSERT INTO likes (user_id, post_id) VALUES (?, ?)";
const sql_unlike = "DELETE FROM likes WHERE user_id = ? AND post_id = ?";

exports.like = (req, res) => {
  const { user_id, post_id, like } = req.body;
  const post = [user_id, post_id];

  if (like === 1) {
    db.query(sql_like, post, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ message: "Post liked successfully!" });
    });
  } else if (like === -1) {
    db.query(sql_unlike, post, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ message: "Post unliked successfully!" });
    });
  } else {
    return res.status(400).json({ error: "Invalid like value" });
  }
};

exports.likeCount = (req, res) => {
  const { post_id, user_id } = req.query;
  const sql_count = `SELECT
  (SELECT COUNT(*) FROM Likes WHERE post_id = ?) AS LikesNumber,
  EXISTS (SELECT 1 FROM Likes WHERE post_id = ? AND user_id = ?) AS UserLike`;

  db.query(sql_count, [post_id, post_id, user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(result[0]);
  });
};
