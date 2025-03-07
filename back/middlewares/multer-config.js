const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../services/cloudinaryConfig");

// Définir le stockage sur Cloudinary avec condition de taille
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let transformations;

    // Vérifier si l'upload vient de updatePicture
    if (req.originalUrl.includes("/api/user/updatePicture")) {
      transformations = [
        { width: 300, height: 300, crop: "fill", gravity: "face" },
      ]; // Taille spécifique pour les avatars
    } else {
      transformations = [{ width: 1080, height: 1920, crop: "limit" }]; // Taille par défaut pour les autres images
    }

    return {
      folder: "groupo-social",
      allowed_formats: ["jpg", "png", "jpeg", "webp", "gif"],
      transformation: transformations,
    };
  },
});

// Initialisation de Multer
module.exports = multer({ storage }).single("image");
