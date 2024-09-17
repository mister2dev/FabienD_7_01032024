const db_config = require("../config/db");
const db = db_config.getDB();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//--------Inscription d'un nouvel utilisateur--------//

exports.signup = async (req, res) => {
  try {
    const { password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10); // Utilisation de bcrypt pour hasher le mot de passe en 10 passes

    const user = {
      ...req.body,
      password: encryptedPassword,
      attachment: "http://localhost:5000/images/avatar-no2.png",
    };
    const sql = "INSERT INTO users SET ?";

    //console.log("user :", user);

    db.query(sql, user, (err, result) => {
      // Envoi vers la base de donnée avec test de doublon
      console.log("reponse sql :", result, err);
      if (err) {
        if (err.errno == 1062 && err.sqlMessage.includes("username"))
          res.status(409).json({ error: "Nom d'utilisateur déjà enregistré" });
        else if (err.errno == 1062 && err.sqlMessage.includes("email")) {
          res.status(409).json({ error: "Email déjà enregistré" });
        }
      } else {
        res.status(201).json({ error: "Nouvel utilisateur créé" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Echec de l'enregistrement", err });
  }
};

//--------Connexion d'un utilisateur--------//

exports.login = (req, res) => {
  const { email, password: clearPassword } = req.body;
  const sql = `SELECT id, username, password, is_active, description, attachment, is_admin, createdAt FROM users WHERE email=?`;

  db.query(sql, email, async (err, results) => {
    //  Test si l'utilisateur existe dans la base de donnée

    if (err) {
      return res.status(404).json({ err });
    }
    if (!results || results.length === 0) {
      return res.status(401).json({ error: "Email non reconnu" });
    }

    //--------Test si l'utilisateur est actif--------//

    if (results[0].is_active !== 1) {
      return res.status(401).json({
        error: true,
        error:
          "Votre compte n'est pas actif. Veuillez contacter l'administrateur.",
      });
    }

    //--------Vérification et comparaison du mot de passe avec le hashage--------//

    if (results[0]) {
      try {
        const { password: hashedPassword } = results[0];
        console.log("résultat requête :", results[0]);

        const match = await bcrypt.compare(clearPassword, hashedPassword);
        console.log("test password :", match);

        if (match) {
          // Si les mots de passe match alors on genere un JWT token
          const user = results[0].username;
          const userId = results[0].id;
          const imagePath = results[0].attachment;
          const description = results[0].description;
          const admin = results[0].is_admin;
          const createdAt = results[0].createdAt;
          console.log("userId :", userId);

          //--------Création du token avec le userId et le token de la variable d'environnement--------//

          const maxAge = "24h";
          const token = jwt.sign({ userId: userId }, process.env.JWT_TOKEN, {
            expiresIn: maxAge,
          });

          res.status(200).json({
            // Envoi de toutes les données en réponse au frontend
            userId,
            user,
            token,
            description,
            createdAt,
            imagePath,
            admin,
          });

          console.log("jwt :", user, token);
        } else {
          // Et si les mots de passe ne match pas, on envoie une erreur
          res.status(401).json({
            error: true,
            error: "Mot de passe incorrect",
          });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({ err });
      }
    }
  });
};

exports.desactivateAccount = (req, res) => {
  const userId = req.params.id;
  const sql = `UPDATE users SET is_active=0 WHERE id = ?`;

  db.query(sql, userId, (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }
    res.status(200).json("Votre compte a bien été desactivé");
  });
};

exports.logout = (req, res) => {
  const nullToken = jwt.sign({}, process.env.JWT_TOKEN, { expiresIn: 0 });

  // On envoie un token null au client pour le remplacer dans le local storage et forcer le delog
  res.status(200).json({ token: nullToken });
};
