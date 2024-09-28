const multer = require("multer");

// On configure Multer pour gérer l'upload de fichiers d'image dans l'application

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_").split(".")[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + "_" + Date.now().toString(36) + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
