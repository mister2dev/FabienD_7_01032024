module.exports = checkUsername = (req, res, next) => {
  const { username } = req.body;
  const usernameRegex = /^[a-zA-Z0-9_-]{3,10}$/; // Le regex pour un username de 3 à 10 caractères alphanumériques, tirets et underscores

  if (!username) {
    return res.status(400).json({ error: "Le nom d'utilisateur est requis." });
  }

  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      error:
        "Le nom d'utilisateur doit avoir entre 3 et 10 caractères alphanumériques, tirets ou underscores.",
    });
  }

  // Si toutes les validations sont vraies, on passe à l'étape suivante
  next();
};
