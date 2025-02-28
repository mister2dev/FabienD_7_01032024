// const multer = require("multer");

// // On configure Multer pour gérer l'upload de fichiers d'image dans l'application

// const MIME_TYPES = {
//   "image/jpg": "jpg",
//   "image/jpeg": "jpg",
//   "image/png": "png",
// };

// // Choix du dossier de destination
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "images");
//   },
//   filename: (req, file, callback) => {
//     // On filtre le nom du fichier pour remplacer les espaces par des _ et ne garder que la partie avant le nom de l'extension
//     const name = file.originalname.split(" ").join("_").split(".")[0];
//     const extension = MIME_TYPES[file.mimetype];
//     callback(null, name + "_" + Date.now().toString(36) + "." + extension);
//   },
// });

// module.exports = multer({ storage: storage }).single("image");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../services/cloudinaryConfig");

// Définir le stockage sur Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "groupo-social", // Dossier où stocker les images sur Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"], // Formats autorisés
    transformation: [{ width: 1080, height: 1920, crop: "limit" }], // Redimensionnement optionnel
  },
});

// Initialisation de Multer

module.exports = multer({ storage }).single("image");
