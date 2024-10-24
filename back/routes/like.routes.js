const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/like", auth, likeCtrl.like);
router.get("/likeCount", auth, likeCtrl.likeCount);

module.exports = router;
