const RaclettePartyService = require("../services/racletteParty");

module.exports = {
  list: async (req, res) => {
    res.status(200).json(await RaclettePartyService.list());
  },
  create: async (req, res) => {
      const {host, date} = req.body
      const newRacletteParty = await RaclettePartyService.create(host, date)
      res.status(200).json(newRacletteParty)
  },
  show: async (req, res) => {
      const id = req.params.id
      console.log("🔎 Finding Party with id"+ id);
      res.status(200).json(await RaclettePartyService.show(id))
  },
  addGuests: async (req, res) => {
    const id = req.params.id
    //TODO check if id exists
    const guests = req.body.guests
    res.status(200).json(await RaclettePartyService.addGuests(id, guests))
  }
};
