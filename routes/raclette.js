const router = require('express').Router();
const RacletteService = require("../services/raclette")

/**List all available raclettes */
router.get("/", async (req, res) => {
    res.json(await RacletteService.list())
})
/* Create a raclette device, defining its owner
    Returns the URL to get its status
*/
router.post("/create", async (req, res) => {
    const newRaclette = await RacletteService.create(req.body.name)
    res.json("http://localhost:7374/raclette/" + newRaclette._id)
})
//Get the status of a Raclette device
router.get("/:id", async (req, res) => {
    res.json(await RacletteService.show(req.params.id));
})
router.get("/on/:id", async (req, res) => {
    res.json(await RacletteService.turnOn(req.params.id));
})
router.get("/off/:id", async (req, res) => {
    res.json(await RacletteService.turnOff(req.params.id));
})

module.exports = router;