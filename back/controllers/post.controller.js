const db_config = require("../config/db");
const db = db_config.getDB();

// CRUD post

exports.createPost = (req, res, next) => {
  const post = req.body;
  //   if (!file) delete req.body.post_image;
  //   body = {
  //     ...body,
  //     likes: "",
  //   };

  db.query("INSERT INTO posts SET ?", post, function (error, results, fields) {
    if (error) {
      return res.status(400).json(error);
    }
    return res
      .status(201)
      .json({ message: "Votre message a bien été posté !" });
  });
};

//   const sqlInsert = "INSERT INTO posts SET ?";
//   db.query(sqlInsert, body, (err, result) => {
//     if (err) {
//       res.status(404).json({ err });
//       throw err;
//     }
//     //post_id will be equal to the post inserted, and will be reused to link the image at the correct post in the below query
//     const post_id = result.insertId;
//     if (file) {
//      const sqlInsertImage = `INSERT INTO images (image_url, post_id) VALUES ("${file.filename}", ${post_id})`;
//      db.query(sqlInsertImage, (err, result) => {
//        if (err) {
//          res.status(404).json({ err });
//          throw err;
//        }
//        res.status(200).json(result);
//      });
//     } else {
//       res.status(200).json(result);
//     }
//   });
// };
