const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const auth = require("../middleware/auth.middleware");
//const upload = require("../middleware/multer-config");

// Post CRUD
router.post("/", postCtrl.createPost);
// router.get("/", auth, postCtrl.getAllPosts);
// router.get("/:id", auth, postCtrl.getOnePost);
// router.put("/:id", auth, postCtrl.updatePost);
// router.delete("/:id", auth, postCtrl.deleteOnePost);

// // Images
// router.get("/image/:id", auth, postCtrl.getOneImage);

// // Like / Unlike
// router.patch("/:id/likeunlike", auth, postCtrl.likeUnlikePost);
// router.post("/:id/postLikedByUser", auth, postCtrl.postLikedByUser);
// router.post("/:id/likeunlike", auth, postCtrl.countLikes);

module.exports = router;
