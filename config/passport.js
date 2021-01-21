const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Connoisseur = mongoose.model("Connoisseur");

passport.use(
  new LocalStrategy(
    // ! Note that these values have to be the ones in the body of the request
    { usernameField: "email", passwordField: "password" },
    (username, password, done) => {
      Connoisseur.findOne({ email: username })
        .then((user) => {
          // Using the validate password method from Connoisseur model
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              errors: { "email or password": "is invalid" },
            });
          }

          return done(null, user);
        })
        .catch(done);
    }
  )
);
