const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Dotenv configuration
require("dotenv").config({path:'./config/.env'});
// Database configuration
require("./config/db.js")();

// default route
app.get("/", (req, res) => {
  res.json("J'aime la raclette 🧀");
});

const racletteRoute = require("./routes/racletteParty");
app.use("/party", racletteRoute);
const connoisseurRoute = require("./routes/connoisseur");
app.use("/connoisseur", connoisseurRoute);

//Defin and start server
const port = process.env.PORT;
app.listen(port, () =>
  console.log(`🧀 Cheese ! I'm started on http://localhost:${port}`)
);
