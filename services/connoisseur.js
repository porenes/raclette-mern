const Connoisseur = require('../models/connoisseur')
module.exports = {

    /**
     * Create a new connoisseur
     */
    create: async (params) => {
        //check if the connoisser exists
        const potentiallyExisting = await Connoisseur.findOne({name:params.name})
        if (potentiallyExisting) {
            console.log("Already existing connoisseur with name : "+params.name)
            return potentiallyExisting
        }
        // create a new connoisseur
        const newConnoisseur = new Connoisseur(params);
        return await newConnoisseur.save()
    },

    /**
     * List all connoisseurs
     */
    list: async () => {
        return await Connoisseur.find()
    }
}