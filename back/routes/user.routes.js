const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

router.get("/:id", auth, userCtrl.getOneUser);
router.get("/", auth, userCtrl.getAllUsers);
router.put("/:id", auth, userCtrl.updateUser);
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;
