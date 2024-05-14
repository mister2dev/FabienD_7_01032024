const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer-config");

router.get("/:id", auth, userCtrl.getOneUser);
router.get("/", auth, userCtrl.getAllUsers);
router.put("/:id", upload, userCtrl.updateUser);
router.delete("/:id", auth, userCtrl.deleteUser);

router.post("/:id", userCtrl.updatePicture);

module.exports = router;
