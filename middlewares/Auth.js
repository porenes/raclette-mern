const passport = require("passport");

module.exports = {
  optional: (req, res, next) => {
    passport.authenticate("bearer", { session: false }, (err, user, info) => {
      req.authenticated = !!user;
      req.user = user
      user
        ? console.log("Authenticated as ", user.email)
        : console.log("Anonymous");
      next();
    })(req, res, next);
  },
  required: (req, res, next) => {
    passport.authenticate("bearer", { session: false })(req, res, next);
  },
};
