const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer-config");

router.get("/:id", userCtrl.getOneUser);
router.get("/", userCtrl.getAllUsers);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", auth, userCtrl.deleteUser);

router.post("/:id", upload, userCtrl.updatePicture);

module.exports = router;
