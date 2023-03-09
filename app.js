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
  password: "26122002Mn@ping",
  database: "website",
});
db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
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

  let name = data.name;
  let first_name = data.first_name;
  let address_mail = data.address_mail;
  let birthday = data.birthday;
  let city = data.city;
  let country = data.country;
  let address = data.address;
  let postal_code = data.postal_code;
  let password = data.password;
  console.log(password);
  console.log(data);
  var sql = "INSERT INTO USER VALUES(?,?,?,?,?,?,?,?,?,?)";
  db.query(
    sql,
    [
      name,
      first_name,
      birthday,
      address_mail,
      city,
      postal_code,
      country,
      address,
      password,
    ],
    function (err, result) {
      if (err) throw err;
      console.log(result);
    }
  );
});
