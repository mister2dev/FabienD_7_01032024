const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("req.body.id :", req.body.id);
    console.log("test :", req.headers.authorization);
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
    console.log("error quoi :", error);
    res.status(401).json({ error: error || "Requête non authentifiée !" });
  }
};
