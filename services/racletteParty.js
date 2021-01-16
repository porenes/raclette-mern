const RacletteParty = require('../models/racletteParty')
module.exports = {

    // listing all raclettes
    list: async() => {
        const racletteParties = await RacletteParty.find()
        return racletteParties;
    },

    create: async (params) => {
        const racletteParty = new RacletteParty({
            host: params.name,
            date: params.date
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

