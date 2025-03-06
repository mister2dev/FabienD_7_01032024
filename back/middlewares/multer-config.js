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
