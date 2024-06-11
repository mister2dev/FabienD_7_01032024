const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.controller");
const auth = require("../middlewares/auth.middleware");

// Comments CRUD
router.post("/", commentCtrl.createComment);
router.get("/", commentCtrl.getAllComments);
router.get("/:id", commentCtrl.getOneComment);
router.delete("/:id", commentCtrl.deleteOneComment);

module.exports = router;
