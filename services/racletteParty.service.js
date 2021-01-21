const RacletteParty = require("../models/racletteParty");
const ConnoisseurService = require("./connoisseur.service");
module.exports = {
  /**
   * Lists all raclette parties
   */
  list: async () => {
    const racletteParties = await RacletteParty.find();
    return racletteParties;
  },

  /**
   * Creates a Raclette party, attaches the host and adds it to the guests
   * @param {String} host Name of the host
   * @param {Date} date date when the party takes place
   */
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

  /**
   * Shows the informations about a Raclette Party
   * @param {String} _id id of the party to show
   */
  show: async (_id) => {
    const findRacletteParty = await RacletteParty.findById(_id);
    return findRacletteParty;
  },

  /**
   * Deletes a raclette party by id
   * @param {String} id Id of the party
   */
  delete: async (id) => {
    return RacletteParty.findByIdAndDelete(id);
  },

  /**
   * Adds guests to a Raclette party 
   * @param {String} id 
   * @param {[String]]} guests 
   */
  addGuests: async (id, guests) => {
    //TODO check if id exists
    try {
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
    } catch (error) {
      console.error("🤦🏻‍♂️ Error adding Guest : " + error);
      throw error;
    }
  },
};
