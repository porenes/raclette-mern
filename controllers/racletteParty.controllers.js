const RaclettePartyService = require("../services/racletteParty.service");

module.exports = {
  list: async (req, res, next) => {
    try {
      res.status(200).json(await RaclettePartyService.list());
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  create: async (req, res, next) => {
    const { host, date } = req.body;
    if (!host || !date)
      res
        .status(400)
        .json({ message: "Please provide a host for the party and a date !" });
    try {
      const newRacletteParty = await RaclettePartyService.create(host, date);
      res.status(201).json(newRacletteParty);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  show: async (req, res, next) => {
    const id = req.params.id;
    if (!id) res.status(404).message("Nothing here");
    try {
      res.status(200).json(await RaclettePartyService.show(id));
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  addGuests: async (req, res, next) => {
    const id = req.params.id;
    if (!id)
      res
        .status(400)
        .json({
          message: "No Party, no guests. Make sure you provide a party ID",
        });
    const guests = req.body.guests;
    if (!guests || guests.length === 0)
      res.status(400).json({ message: "No guest provided" });
    try {
      res.status(200).json(await RaclettePartyService.addGuests(id, guests));
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
};
