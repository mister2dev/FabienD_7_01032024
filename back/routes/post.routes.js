const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer-config");

// Post CRUD
router.post("/", auth, upload, postCtrl.createPost);
router.get("/:id", postCtrl.getOnePost);
router.get("/", auth, postCtrl.getAllPosts);
router.put("/:id", auth, upload, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deleteOnePost);

module.exports = router;
