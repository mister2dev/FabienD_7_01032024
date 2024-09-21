const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");
const checkUsername = require("../middlewares/username-validator");
const checkEmail = require("../middlewares/email-validator");
const checkPassword = require("../middlewares/password-validator");

router.post(
  "/signup",
  checkUsername,
  checkEmail,
  checkPassword,
  authCtrl.signup
);
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);
router.post("/desactivate/:id", auth, authCtrl.desactivateAccount);

module.exports = router;
