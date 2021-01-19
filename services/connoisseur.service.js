const Connoisseur = require('../models/connoisseur')
module.exports = {

    /**
     * Create a new connoisseur
     */
    create: async (name) => {
        //check if the connoisser exists
        const potentiallyExisting = await Connoisseur.findOne({name})
        if (potentiallyExisting) {
            console.log("Already existing connoisseur with name : "+name)
            return potentiallyExisting
        }
        // create a new connoisseur
        const newConnoisseur = new Connoisseur({name});
        return await newConnoisseur.save()
    },

    /**
     * List all connoisseurs
     */
    list: async () => {
        return await Connoisseur.find()
    },

    findByName: async (name) => {
        return await Connoisseur.findOne({name})
    }

}