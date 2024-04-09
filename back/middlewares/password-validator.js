const passwordSchema = require("../utils/password");

module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.status(400).json({
      error:
        "Votre mot de passe doit contenir au minimum 8 caractères, dont une majuscule, une minuscule et un chiffre.",
    });
  } else {
    next();
  }
};
