const express = require("express");
const path = require("path");
const app = express();
const helmet = require("helmet");

//const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user.routes");

//-------Cors--------------

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//-------Middleware-----------

app.use(helmet());
app.use(express.json());

//-------Routes---------------

//app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/user", userRoutes);
//app.use("/api/sauces", sauceRoutes);

module.exports = app;
