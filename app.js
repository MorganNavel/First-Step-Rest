const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Notre application Node écoute sur : http://localhost:${port}`);
});
app.use((req, res, next) => {
  morgan("dev");
  next();
}).use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.get("/", (req, res) => {
  res.send("Hello World ! ");
});

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
