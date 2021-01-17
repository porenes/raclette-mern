const router = require('express').Router();
const RaclettePartyController = require("../controllers/racletteParty.controllers")

/**List all available raclettes */
router.get("/", async (req, res) => {
    await RaclettePartyController.list(req,res)
})
/* Create a raclette party, defining its owner
    Returns the URL to get its status
*/
router.post("/create", async (req, res) => {
    await RaclettePartyController.create(req,res)
})
//Get the info about s RacletteParty
router.get("/:id", async (req, res) => {
    await RaclettePartyController.show(req, res)
})
/**
 * Adding guests to a raclette party
 */
router.put("/addGuests/:id", async (req, res) => {
    await RaclettePartyController.addGuests(req, res)
})

module.exports = router;