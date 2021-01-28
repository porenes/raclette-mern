const mongoose = require("mongoose");
const RaclettePassport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");
const Connoisseur = mongoose.model("Connoisseur");

// username password strategy
RaclettePassport.use(
  new LocalStrategy(
    // ! Note that these values have to be the ones in the body of the request
    { usernameField: "email", passwordField: "password" },
    // * Verification function
    (username, password, done) => {
      console.log("Finding user for auth : ", username);
      Connoisseur.findOne({ email: username }).select("+hash +salt")
        .then((user) => {
          // Using the validate password method from Connoisseur model
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              errors: { "email or password": "is invalid" },
            });
          }
          console.log("user authenticated ", user.id);
          return done(null, user);
        })
        .catch((err) => {
          console.error(err);
          return done(err);
        });
    }
  )
);

// Bearer strategy for JWT token
RaclettePassport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, "secret", (err, payload) => {
      // If checking failed
      if (err) {
        return done(err);
      }

      // If user is empty
      if (!payload) {
        return done(null, false);
      }

      // If everything all right, the user will be authenticated
      
      return done(null, payload);
    });
  })
);

// Save the connoisseur into se session
RaclettePassport.serializeUser((user, done) => {
  console.log("serializing", user);
  if (!user) {
    return done(null, false);
  }
  return done(null, user.id);
});
//Restore the connoisseur object from the session
RaclettePassport.deserializeUser((id, done) => {
  console.log("deserializing ", id);
  Connoisseur.findById(id, (err, user) => {
    // TODO improve error handling
    if (err) return done(err);
    //user does not exist
    if (!user) return done(null, false);
    return done(null, user);
  });
});

module.exports = RaclettePassport;
