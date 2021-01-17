const router = require('express').Router();
const RaclettePartyController = require("../controllers/racletteParty.controllers")

/**List all available raclettes */
router.get("/", async (req, res) => {
    await RaclettePartyController.list(req,res)
})
/* Create a raclette device, defining its owner
    Returns the URL to get its status
*/
router.post("/create", async (req, res) => {
    await RaclettePartyController.create(req,res)
})
//Get the status of a Raclette device
router.get("/:id", async (req, res) => {
    await RaclettePartyController.show(req, res)
})

module.exports = router;