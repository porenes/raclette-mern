const router = require('express').Router();
const RaclettePartyService = require("../services/racletteParty")

/**List all available raclettes */
router.get("/", async (req, res) => {
    res.json(await RaclettePartyService.list())
})
/* Create a raclette device, defining its owner
    Returns the URL to get its status
*/
router.post("/create", async (req, res) => {
    const newRacletteParty = await RaclettePartyService.create(req.body)
    res.json("http://localhost:7374/raclette/" + newRacletteParty._id)
})
//Get the status of a Raclette device
router.get("/:id", async (req, res) => {
    res.json(await RaclettePartyService.show(req.params.id));
})

module.exports = router;