const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer-config");

router.get("/:id", userCtrl.getOneUser);
router.get("/", userCtrl.getAllUsers);
router.put("/:id", auth, userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);

router.post("/:id", auth, upload, userCtrl.updatePicture);

module.exports = router;
