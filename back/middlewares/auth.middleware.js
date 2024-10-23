const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("testauth :", req.headers.authorization);
    //On récupère le token de l'en-tête Authorization en supprimant Bearer
    const token = req.headers.authorization.split(" ")[1];
    console.log("tokenauth :", token);

    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    console.log("decoded :", decodedToken);
    const reqId = req.body.id;
    const userAuthId = decodedToken.userId;
    if (reqId && parseInt(reqId) !== userAuthId) {
      throw "Utilisateur non-reconnu !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error || "Requête non authentifiée !" });
  }
};
