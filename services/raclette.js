const raclette = require('../models/raclette');
const Raclette = require('../models/raclette')
module.exports = {

    // listing all raclettes
    list: async() => {
        const raclettes = await Raclette.find()
        return raclettes;
    },

    create: async (owner) => {
        const raclette = new Raclette({
            owner: owner,
            status: false
        });
        try {
            const newRacletteEntry = await raclette.save()
            return newRacletteEntry;
        } catch (error) {
            throw error
        }
    },

    show: async (_id) => {
        const findRaclette = await Raclette.findById(_id)
        return { findRaclette }
    }
    ,
    turnOn: async (_id) => {         
        const findRaclette = await Raclette.findById(_id)
        findRaclette.status = true;
        await findRaclette.save()
        return { status: findRaclette.status }
    }
    ,
    turnOff: async (_id) => {         
        const findRaclette = await Raclette.findById(_id)
        findRaclette.status = false;
        await findRaclette.save()
        return { status: findRaclette.status }
    }
}

