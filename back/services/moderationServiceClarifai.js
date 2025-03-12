const Clarifai = require("clarifai");

// Initialiser Clarifai avec ta clé API
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY,
});

async function moderateImage(imageUrl) {
  try {
    const response = await app.models.predict(
      Clarifai.MODERATION_MODEL,
      imageUrl
    );

    // Vérifie si Clarifai a bien retourné des résultats
    if (!response.outputs || response.outputs.length === 0) {
      console.error("⚠️ Aucun résultat de modération reçu !");
      return false;
    }

    // Récupérer les concepts de la modération
    const concepts = response.outputs[0].data.concepts;

    // Transformer la réponse en un objet plus lisible
    const moderationResult = concepts.reduce((acc, concept) => {
      acc[concept.name] = concept.value;
      return acc;
    }, {});

    console.log("🔍 Résultats de la modération d'image :", moderationResult);

    // Définir un seuil de tolérance (ex: 0.8 = 80% de confiance)
    const SEUIL_INAPPROPRIE = 0.8;

    // Vérifie si une catégorie sensible dépasse le seuil
    const categoriesInterdites = [
      "explicit", // Contenu explicite
      "suggestive", // Contenu suggestif
      "gore", // Violence / Sanglant
      "drug", // Drogues
    ];

    const imageRefusee = categoriesInterdites.some(
      (categorie) => moderationResult[categorie] > SEUIL_INAPPROPRIE
    );

    if (imageRefusee) {
      console.log("❌ Image refusée ! Trop explicite.");
      return false;
    }

    console.log("✅ Image validée !");
    return true;
  } catch (error) {
    console.error(
      "❌ Erreur lors de la modération d'image avec Clarifai :",
      error
    );
    return false;
  }
}

module.exports = { moderateImage };
