const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer-config");

// Post CRUD
router.post("/", upload, postCtrl.createPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.get("/", postCtrl.getAllPosts);
router.put("/:id", upload, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deleteOnePost);

// Images
//router.get("/image/:id", postCtrl.getOneImage);

// // Like / Unlike
// router.patch("/:id/likeunlike", auth, postCtrl.likeUnlikePost);
// router.post("/:id/postLikedByUser", auth, postCtrl.postLikedByUser);
// router.post("/:id/likeunlike", auth, postCtrl.countLikes);

module.exports = router;
