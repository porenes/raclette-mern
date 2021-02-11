const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
// const session = require("express-session");

const app = express();
app.use(morgan("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Dotenv configuration
require("dotenv").config({ path: "./config/.env" });
// ! CORS enabled from everywhere
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));
// Database configuration
require("./config/db.js")();
require("./models/connoisseur"); //! Required here for passport to work

//Passport configuration
const passport = require("./config/passport");
app.use(passport.initialize());

// Route declaration
const racletteRoute = require("./routes/racletteParty.routes");
app.use("/party", racletteRoute);
const connoisseurRoute = require("./routes/connoisseur.routes");
app.use("/connoisseur", connoisseurRoute);
const postRoute = require("./routes/post.routes");
app.use("/post", postRoute);
const productsRoute = require("./routes/products.routes");
app.use("/products", productsRoute);
// Nice error handling
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "invalid token..." });
  }
});

//Define and start server
const port = process.env.PORT;
app.listen(port, () =>
  console.log(`🧀 Cheese ! I'm started on http://localhost:${port}`)
);
