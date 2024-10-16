const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.controller");
const auth = require("../middlewares/auth.middleware");

// Comments CRUD
router.post("/", auth, commentCtrl.createComment);
router.get("/", auth, commentCtrl.getAllComments);
router.get("/:id", auth, commentCtrl.getOneComment);
router.delete("/:id", auth, commentCtrl.deleteOneComment);

module.exports = router;
