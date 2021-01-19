const ConnoisseurService = require("../services/connoisseur.service");

module.exports = {
  list: async (req, res) => {
    try {
      res.status(200).json(await ConnoisseurService.list());
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  create: async (req, res) => {
    const { name } = req.body.name;
    if (!name)
      res
        .status(400)
        .json({ message: "Please provide a name to create a new connoisseur" });
    try {
      res.status(201).json(await ConnoisseurService.create(name));
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
};
