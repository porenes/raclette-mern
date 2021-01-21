const router = require("express").Router();
const RaclettePartyController = require("../controllers/racletteParty.controllers");
const auth = require("./auth.routes")

/**List all available raclettes */
router.get("/", auth.optional, async (req, res, next) => {
  await RaclettePartyController.list(req, res, next);
});
/**  Create a raclette party, defining its owner
    Returns the URL to get its status
*/
router.post("/create", auth.optional, async (req, res, next) => {
  await RaclettePartyController.create(req, res, next);
});
//Get the info about s RacletteParty
router.get("/:id", auth.optional, async (req, res, next) => {
  await RaclettePartyController.show(req, res, next);
});
/**
 * Adding guests to a raclette party
 */
router.put("/addGuests/:id", auth.optional, async (req, res, next) => {
  await RaclettePartyController.addGuests(req, res, next);
});

module.exports = router;
