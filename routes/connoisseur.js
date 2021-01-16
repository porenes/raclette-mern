const router = require('express').Router();
const ConnoisseurService = require("../services/connoisseur")

/**List all available raclettes */
router.get("/", async (req, res) => {
    res.json(await ConnoisseurService.list())
})
/* Create a raclette device, defining its owner
    Returns the URL to get its status
*/
router.post("/create", async (req, res) => {
    const newConnoisseur = await ConnoisseurService.create(req.body)
    res.json(newConnoisseur)
})
//Get the status of a Raclette device
router.get("/:name", async (req, res) => {
    res.json("todo");
})

module.exports = router;