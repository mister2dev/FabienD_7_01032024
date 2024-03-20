const multer = require("multer");

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
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

// Fonction de validation du fichier
const fileFilter = (req, file, callback) => {
  if (
    file &&
    (file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png")
  ) {
    // Vérifier la taille du fichier
    if (file.size <= 500000) {
      // Le fichier a un MIME type valide et une taille valide, on accepte le fichier
      callback(null, true);
    } else {
      // Le fichier dépasse la taille maximale autorisée, on rejette le fichier
      callback(null, false);
    }
  } else {
    // Le fichier a un MIME type invalide, on rejette le fichier
    callback(null, false);
  }
};

module.exports = multer({ storage: storage, fileFilter: fileFilter }).single(
  "image"
);
