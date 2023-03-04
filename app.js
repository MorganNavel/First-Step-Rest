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

// app.post("/api/formulaire",(req,res)=>{
//   console.log("Traitement du formulaire en cours");
//   let data = req.body;
//   console.log(data);
// })

app.get("/", (req, res) => {
  res.send("Hello World ! ");
});
app.post("/api/");
app.get("/api/type/:type", (req, res) => {
  fs.readFile("./json/content.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    try {
      const data = JSON.parse(jsonString);
      let restaurants = [];
      for (const feature of data.features) {
        if (feature.properties.amenity == req.params.type) {
          restaurants.push(feature);
        }
      }
      // console.log(restaurants);
      res.end(JSON.stringify(restaurants));
    } catch (err) {
      console.log(`Erreur: ${err}`);
    }
  });
});
app.get("/api/type", (req, res) => {
  fs.readFile("./json/content.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    try {
      const data = JSON.parse(jsonString);
      let type_place = [];
      for (const feature of data.features) {
        if (!type_place.includes(feature.properties.amenity)) {
          type_place.push(feature.properties.amenity);
        }
      }
      res.send(type_place);
    } catch (err) {
      console.log(`Erreur: ${err}`);
    }
  });
});
