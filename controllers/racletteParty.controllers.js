const RaclettePartyService = require("../services/racletteParty");

module.exports = {
  list: async (req, res) => {
    res.status(200).json(RaclettePartyService.list());
  },
  create: async (req, res) => {
      const {host, date} = req.body
      const newRacletteParty = await RaclettePartyService.create(host, date)
      res.status(200).json(newRacletteParty)
  },
  show: async (req, res) => {
      const id = req.body.id
      res.status(200).json(await RaclettePartyService.show(id))
  },
};
