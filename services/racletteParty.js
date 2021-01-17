const RacletteParty = require('../models/racletteParty')
const ConnoisseurService = require('./connoisseur')
module.exports = {

    // listing all raclettes
    list: async() => {
        const racletteParties = await RacletteParty.find()
        return racletteParties;
    },

    create: async (host, date) => {
        // finding the host by its name (should be unique)
        const hostObj = await ConnoisseurService.findByName(host)
        const racletteParty = new RacletteParty({
            host,
            date
        });
        try {
            const newRaclettePartyEntry = await racletteParty.save()
            return newRaclettePartyEntry;
        } catch (error) {
            throw error
        }
    },

    show: async (_id) => {
        const findRacletteParty = await RacletteParty.findById(_id)
        return { findRaclette: findRacletteParty }
    }

}

