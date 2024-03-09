const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db_config = require("../config/db");

exports.signup = async (req, res) => {
  try {
    const { password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = { ...req.body, password: encryptedPassword };
    const sql = "INSERT INTO users SET ?";
    const db = db_config.getDB();

    //console.log("user :", user);

    db.query(sql, user, (err, result) => {
      //console.log("reponse sql :", result);
      if (!result) {
        res.status(200).json({ message: "Email déjà enregistré" });
      } else {
        res.status(201).json({ message: "User created !" });
      }
    });
  } catch (err) {
    res.status(200).json({ message: "Failed registration", err });
  }
};

exports.login = (req, res) => {
  //===== Check if user exists in DB ======
  const { email, password: clearPassword } = req.body;
  const sql = `SELECT id, username, password FROM users WHERE email=?`;
  const db = db_config.getDB();

  db.query(sql, email, async (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }
    // ===== Verify password with hash in DB ======
    if (results[0]) {
      try {
        const { password: hashedPassword, id } = results[0];
        console.log("résultat requête :", results);

        const match = await bcrypt.compare(clearPassword, hashedPassword);
        console.log("mdp OK :", match);

        if (match) {
          // If match, generate JWT token
          const user = results[0];
          const token = jwt.sign({ userId: user.id }, process.env.JWT_TOKEN, {
            expiresIn: "24h",
          });

          res.status(200).json({ user, token });
          console.log("jwt :", user, token);
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
