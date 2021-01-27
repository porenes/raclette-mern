const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const session = require("express-session");

const app = express();

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
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));
// Database configuration
require("./config/db.js")();
require("./models/connoisseur"); //! Required here for passport to work
// Session configuration


// app.use(
//   session({
//     //TODO research all these params
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true
//   })
// );
//Passport configuration
const passport = require("./config/passport");
app.use(passport.initialize());
//app.use(passport.session());


// Route declaration
const racletteRoute = require("./routes/racletteParty.routes");
app.use("/party", racletteRoute);
const connoisseurRoute = require("./routes/connoisseur.routes");
app.use("/connoisseur", connoisseurRoute);

// Nice error handling
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "invalid token..." });
  }
});
// app.use((err, req, res) => {
//   res.status(err.status || 500);

//   res.json({
//     errors: {
//       message: err.message,
//       error: {},
//     },
//   });
// });

//Define and start server
const port = process.env.PORT;
app.listen(port, () =>
  console.log(`🧀 Cheese ! I'm started on http://localhost:${port}`)
);
