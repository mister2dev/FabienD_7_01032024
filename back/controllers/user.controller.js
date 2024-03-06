const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const dbc = require("../config/db");

exports.signup = async (req, res) => {
  try {
    const { user_password: password } = req.body;

    // ====== Password encryption =========
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = {
      ...req.body,
      user_password: encryptedPassword,
    };
    const sql = "INSERT INTO users SET ?";
    const db = dbc.getDB();
    db.query(sql, user, (err, result) => {
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
