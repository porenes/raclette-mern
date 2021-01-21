const ConnoisseurService = require("../services/connoisseur.service");
const passport = require("passport");
const Connoisseur = require("../models/connoisseur");
module.exports = {
  list: async (req, res,next) => {
    try {
      res.status(200).json(await ConnoisseurService.list());
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  create: async (req, res) => {
    const connoisseurDTO = req.body;
    if (!connoisseurDTO.name)
      res
        .status(400)
        .json({ message: "Please provide a name to create a new connoisseur" });
    try {
      res.status(201).json(await ConnoisseurService.create(connoisseurDTO));
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  register: async (req, res, next) => {
    const connoisseur = req.body;
    if (!connoisseur.email) {
      return res.status(422).json({
        errors: {
          email: "is required",
        },
      });
    }

    if (!connoisseur.password) {
      return res.status(422).json({
        errors: {
          password: "is required",
        },
      });
    }

    const finalUser = await ConnoisseurService.register(connoisseur);
    res.json({ user: finalUser });
  },
  login: (req, res, next) => {
    const user = req.body;
    console.log("Entering ConnoisseurController.login : ", req.body);
    if (!user.email) {
      return res.status(422).json({
        errors: {
          email: "is required",
        },
      });
    }

    if (!user.password) {
      return res.status(422).json({
        errors: {
          password: "is required",
        },
      });
    }

    return passport.authenticate(
      "local",
      { session: false },
      (err, connoisseur, info) => {
        console.log("authenticating :"+connoisseur);

        if (err) {
          console.error("Error when authenticating : "+err);
          return next(err);
        }

        if (connoisseur) {
          const user = connoisseur;
          user.token = connoisseur.generateJWT();

          return res.status(200).json({ user: user.toAuthJSON() });
        }

        return res.status(400).json(info);
      }
    )(req, res, next);
  },
};
