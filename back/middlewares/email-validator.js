const checkEmail = require("email-validator");

module.exports = (req, res, next) => {
  if (!checkEmail.validate(req.body.email)) {
    return res
      .status(400)
      .json({ error: "Veuillez saisir une adresse électronique valide." });
  } else {
    next();
  }
};
