const raclette = require('../models/raclette');
const Raclette = require('../models/raclette')
module.exports = {

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

    status: async (_id) => {
        const findRaclette = await Raclette.findById(_id)
        console.log(findRaclette)
        return { status: findRaclette.status }
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

