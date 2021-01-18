const ConnoisseurService = require("../services/connoisseur.service")

module.exports = {
    list: async (req, res) => {
        res.status(200).json(await ConnoisseurService.list())
    },
    create: async (req, res) => {
        const params = req.body
        res.status(200).json(await ConnoisseurService.create(params))
    }
}