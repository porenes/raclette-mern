const Connoisseur = require('../models/connoisseur')
module.exports = {

    /**
     * Create a new connoisseur
     */
    create: async (params) => {
        //check if the connoisser exists
        if (await Connoisseur.findOne({name:params.name})) {return}
        // create a new connoisseur
        const newConnoisseur = new Connoisseur({name: params.name});
        return await newConnoisseur.save()
    },

    /**
     * List all connoisseurs
     */
    list: async () => {
        return await Connoisseur.find()
    }
}