const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");

router.get("/:id", userCtrl.getOneUser);
router.get("/", userCtrl.getAllUsers);
router.delete("/:id", userCtrl.deleteUser);
router.put("/:id", userCtrl.updateUser);

module.exports = router;
