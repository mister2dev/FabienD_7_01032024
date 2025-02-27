const db_config = require("../config/db");
const db = require("../config/db");
// const db = db_config.getDB();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//--------Inscription d'un nouvel utilisateur--------//

exports.signup = async (req, res) => {
  // try {
  //   const { password } = req.body;
  //   const encryptedPassword = await bcrypt.hash(password, 10); // Utilisation de bcrypt pour hasher le mot de passe en 10 passes

  //   // On récupère l'objet user en y ajoutant encryptedPassword et attachment qui est l'icone par défaut ici
  //   const user = {
  //     ...req.body,
  //     password: encryptedPassword,
  //     attachment: "http://localhost:5000/images/avatar-no2.png",
  //   };
  //   const sql = "INSERT INTO users SET ?";

  //   // Envoi vers la base de donnée avec test de doublon
  //   db.query(sql, user, (err, result) => {
  //     console.log("reponse sql :", result, err);
  //     if (err) {
  //       if (err.errno == 1062 && err.sqlMessage.includes("username"))
  //         res.status(409).json({ error: "Nom d'utilisateur déjà enregistré" });
  //       else if (err.errno == 1062 && err.sqlMessage.includes("email")) {
  //         res.status(409).json({ error: "Email déjà enregistré" });
  //       }
  //     } else {
  //       res.status(201).json({ error: "Nouvel utilisateur créé" });
  //     }
  //   });
  // } catch (err) {
  //   res.status(500).json({ message: "Echec de l'enregistrement", err });
  // }

  try {
    const { password, username, email, description } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Définir l'image par défaut de l'utilisateur
    const attachment = "http://localhost:5000/images/avatar-no.png";

    // Requête SQL pour l'insertion dans PostgreSQL
    const sql = `
      INSERT INTO users (username, email, password, description, attachment, is_active, is_admin, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, true, false, NOW(), NOW())
      RETURNING id;
    `;

    const values = [
      username,
      email,
      encryptedPassword,
      description,
      attachment,
    ];

    // Envoi vers la base de données avec test de doublon
    await db.query(sql, values);

    res.status(201).json({ message: "Nouvel utilisateur créé" });
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err);
    if (err.code === "23505") {
      if (err.detail.includes("username")) {
        res.status(409).json({ error: "Nom d'utilisateur déjà enregistré" });
      } else if (err.detail.includes("email")) {
        res.status(409).json({ error: "Email déjà enregistré" });
      }
    } else {
      res.status(500).json({ message: "Échec de l'enregistrement", err });
    }
  }
};

//--------Connexion d'un utilisateur--------//

// exports.login = (req, res) => {
//   const { email, password: clearPassword } = req.body;
//   const sql = `SELECT id, username, password, is_active, description, attachment, is_admin, createdAt FROM users WHERE email=?`;

//   // Test si l'utilisateur existe dans la base de donnée
//   db.query(sql, email, async (err, results) => {
//     if (err) {
//       return res.status(404).json({ err });
//     }
//     if (!results || results.length === 0) {
//       return res.status(401).json({ error: "Email non reconnu" });
//     }

//     //--------Test si l'utilisateur est actif--------//
//     if (results[0].is_active !== 1) {
//       return res.status(401).json({
//         error: true,
//         error:
//           "Votre compte n'est pas actif. Veuillez contacter l'administrateur.",
//       });
//     }

//     //--------Vérification et comparaison du mot de passe avec le hashage--------//
//     if (results[0]) {
//       try {
//         const { password: hashedPassword } = results[0];
//         console.log("résultat requête :", results[0]);

//         const match = await bcrypt.compare(clearPassword, hashedPassword);
//         console.log("test password :", match);

//         if (match) {
//           // Si les mots de passe correspondent alors on génère un JWT token
//           const user = results[0].username;
//           const userId = results[0].id;
//           const imagePath = results[0].attachment;
//           const description = results[0].description;
//           const admin = results[0].is_admin;
//           const createdAt = results[0].createdAt;

//           console.log("userId :", userId);

//           // Création du token avec le userId et le token de la variable d'environnement
//           const maxAge = "24h";
//           const token = jwt.sign({ userId: userId }, process.env.JWT_TOKEN, {
//             expiresIn: maxAge,
//           });

//           res.status(200).json({
//             // Envoi de toutes les données en réponse au frontend
//             userId,
//             user,
//             token,
//             description,
//             createdAt,
//             imagePath,
//             admin,
//           });

//           console.log("jwt :", user, token);
//         } else {
//           // Si les mots de passe ne correspondent pas, on envoie un message d'erreur
//           res.status(401).json({
//             error: true,
//             error: "Mot de passe incorrect",
//           });
//         }
//       } catch (err) {
//         console.log(err);
//         return res.status(400).json({ err });
//       }
//     }
//   });
// };

// exports.desactivateAccount = (req, res) => {
//   const userId = req.params.id;
//   const sql = `UPDATE users SET is_active=0 WHERE id = ?`;

//   db.query(sql, userId, (err, results) => {
//     if (err) {
//       return res.status(404).json({ err });
//     }
//     res.status(200).json("Votre compte a bien été desactivé");
//   });
// };

exports.login = async (req, res) => {
  const { email, password: clearPassword } = req.body;
  const sql = `
    SELECT id, username, password, is_active, description, attachment, is_admin, created_at 
    FROM users 
    WHERE email = $1;
  `;

  try {
    const { rows } = await db.query(sql, [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: "Email non reconnu" });
    }

    // Vérification si le compte utilisateur est actif
    if (!user.is_active) {
      return res.status(401).json({
        error:
          "Votre compte n'est pas actif. Veuillez contacter l'administrateur.",
      });
    }

    // Comparaison du mot de passe avec bcrypt
    const match = await bcrypt.compare(clearPassword, user.password);
    if (!match) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    // Création du token JWT
    const maxAge = "24h";
    const token = jwt.sign({ userId: user.id }, process.env.JWT_TOKEN, {
      expiresIn: maxAge,
    });

    res.status(200).json({
      userId: user.id,
      user: user.username,
      token,
      description: user.description,
      createdAt: user.createdat,
      imagePath: user.attachment,
      admin: user.is_admin,
    });
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

//--------Désactivation d'un compte utilisateur--------//

exports.desactivateAccount = async (req, res) => {
  const userId = req.params.id;
  const sql = `UPDATE users SET is_active = false WHERE id = $1`;

  try {
    await db.query(sql, [userId]);
    res.status(200).json("Votre compte a bien été désactivé");
  } catch (err) {
    console.error("Erreur lors de la désactivation du compte :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
