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
};
