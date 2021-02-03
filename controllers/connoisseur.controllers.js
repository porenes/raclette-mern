const ConnoisseurService = require("../services/connoisseur.service");
const RaclettePassport = require("passport");
const Connoisseur = require("../models/connoisseur");
module.exports = {
  list: async (req, res, next) => {
    try {
      res.status(200).json(await ConnoisseurService.list());
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  byIds: async (req, res, next) => {
    try {
      const { ids } = req.body;
      res.status(200).json(await ConnoisseurService.findByIds(ids));
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  create: async (req, res, next) => {
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
  show: async (req, res, next) => {
    const id = req.params.id;
    if (!id) res.status(404).message("Nothing here");
    try {
      res.status(200).json(await ConnoisseurService.show(id));
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  woo: async (req, res, next) => {
    //* Wooer is the one making the request
    const wooerId = req.user.id;
    const wooedId = req.params.id;
    if (!wooedId) res.status(400).json({ message: "missing wooedId" });
    try {
      res.status(200).json(await ConnoisseurService.woo(wooerId, wooedId));
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  unwoo: async (req, res, next) => {
    //* Wooer is the one making the request
    const unwooerId = req.user.id;
    const unwooedId = req.params.id;
    if (!unwooedId) res.status(400).json({ message: "missing unwooedId" });
    try {
      res.status(200).json(await ConnoisseurService.woo(unwooerId, unwooedId));
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  /**
   * @deprecated
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  accept: async (req, res, next) => {
    //* Wooed is the one accepting the request
    const wooedId = req.user.id;
    const wooerId = req.params.id;
    if (!wooedId) res.status(400).json({ message: "missing wooedId" });
    try {
      res.status(200).json(await ConnoisseurService.accept(wooerId, wooedId));
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },

  me: async (req, res, next) => {
    const id = req.user.id;
    if (!id) res.status(404).message("Nothing here");
    try {
      res.status(200).json(await ConnoisseurService.show(id));
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  uid: async (req, res, next) => {
    res.status(200).json(req.user);
  },
  delete: async (req, res, next) => {
    const id = req.params.id;
    if (!id) res.status(422).message("Id is required");
    try {
      await ConnoisseurService.delete(id);
      res.status(204).send();
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
    try {
      const finalUser = await ConnoisseurService.register(connoisseur);
      res.status(201).json({ user: finalUser });
    } catch (errors) {
      console.error(errors);
      res.status(400).json({ errors });
    }
  },
  login: (req, res, next) => {
    const user = req.body;
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

    //TODO maybe move to the service
    return RaclettePassport.authenticate("local", (err, connoisseur, info) => {
      if (err) {
        console.error("Error when authenticating : " + err);
        return next(err);
      }
      if (connoisseur) {
        const user = connoisseur;
        user.token = connoisseur.generateJWT();
        return res.status(200).json({ user: user.toAuthJSON() });
      }

      return res.status(400).json(info);
    })(req, res, next);
  },
};
