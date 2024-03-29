const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db_config = require("../config/db");
const db = db_config.getDB();

exports.signup = async (req, res) => {
  try {
    const { password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = { ...req.body, password: encryptedPassword };
    const sql = "INSERT INTO users SET ?";

    //console.log("user :", user);

    db.query(sql, user, (err, result) => {
      //console.log("reponse sql :", result);
      if (!result) {
        res.status(200).json({ message: "Email déjà enregistré" });
      } else {
        res.status(201).json({ message: "Nouvel utilisateur créé" });
      }
    });
  } catch (err) {
    res.status(200).json({ message: "Echec de l'enregistrement", err });
  }
};

exports.login = (req, res) => {
  //===== Check if user exists in DB ======
  const { email, password: clearPassword } = req.body;
  const sql = `SELECT id, username, password, is_active FROM users WHERE email=?`;

  db.query(sql, email, async (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }

    // Check if user is active
    if (results[0].is_active !== 1) {
      return res.status(401).json({
        error: true,
        message:
          "Votre compte n'est pas actif. Veuillez contacter l'administrateur.",
      });
    }

    // ===== Verify password with hash in DB ======
    if (results[0]) {
      try {
        const { password: hashedPassword } = results[0];
        console.log("résultat requête :", results);

        const match = await bcrypt.compare(clearPassword, hashedPassword);
        console.log("mdp OK :", match);

        if (match) {
          // If match, generate JWT token
          const user = results[0].username;
          const userId = results[0].id;
          console.log("userId :", userId);
          const maxAge = "24h";
          const token = jwt.sign({ userId: userId }, process.env.JWT_TOKEN, {
            expiresIn: maxAge,
          });

          res.status(200).json({ user, token });
          console.log("jwt :", user, token);
        } else {
          // Password does not match
          res.status(401).json({
            error: true,
            message: "Mot de passe incorrect",
          });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({ err });
      }
    } else if (!results[0]) {
      res.status(401).json({
        error: true,
        message: "Erreur d'email ou mot de passe",
      });
    }
  });
};

exports.desactivateAccount = (req, res) => {
  const userId = req.params.id;
  const sql = `UPDATE users SET is_active=0 WHERE users.id = ?`;
  db.query(sql, userId, (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }
    res.status(200).json("DESACTIVATE");
  });
};

exports.logout = (req, res) => {
  const nullToken = jwt.sign({}, process.env.JWT_TOKEN, { expiresIn: 0 });

  // Envoyer le token null au client pour le remplacer dans le local storage
  res.status(200).json({ token: nullToken });
};
