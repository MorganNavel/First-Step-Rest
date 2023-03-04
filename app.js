const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const app = express();
const port = 3000;
const mysql = require("mysql");
let bodyParser = require("body-parser");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "website",
});
db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});
db.query("SELECT * FROM user", function (err, result) {
  if (err) throw err;
  console.log(result);
});

app.listen(port, () => {
  console.log(`Notre application Node écoute sur : http://localhost:${port}`);
});
app
  .use((req, res, next) => {
    morgan("dev");
    next();
  })
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  })
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json());

app.post("/api/formulaire", (req, res) => {
  console.log("Traitement du formulaire en cours");
  let data = req.body;
  console.log(data);
});
