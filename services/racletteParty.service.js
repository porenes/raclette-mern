const RacletteParty = require("../models/racletteParty");
const ConnoisseurService = require("./connoisseur.service");
module.exports = {
  // listing all raclettes
  list: async () => {
    const racletteParties = await RacletteParty.find();
    console.log(racletteParties);
    return racletteParties;
  },

  create: async (host, date) => {
    // finding the host by its name (should be unique)
    let hostObj = await ConnoisseurService.findByName(host);
    if (!hostObj) {
      hostObj = await ConnoisseurService.create({ name: host });
    }
    const racletteParty = new RacletteParty({
      host: hostObj.name,
      date,
      guests: [hostObj.id],
    });
    try {
      const newRaclettePartyEntry = await racletteParty.save();
      return newRaclettePartyEntry;
    } catch (error) {
      throw error;
    }
  },

  show: async (_id) => {
    const findRacletteParty = await RacletteParty.findById(_id);
    return findRacletteParty;
  },

  addGuests: async (id, guests) => {
    const raclette = await RacletteParty.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          guests,
        },
      },
      { returnOriginal: false }
    );
    return raclette;
  },
};
