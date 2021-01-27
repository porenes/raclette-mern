const router = require("express").Router();
const RaclettePartyController = require("../controllers/racletteParty.controllers");
const Auth = require("../middlewares/Auth");

/**List all available raclettes */
router.get("/", Auth.optional, async (req, res, next) => {
  await RaclettePartyController.list(req, res, next);
});
/**  Create a raclette party, defining its owner
    Returns the URL to get its status
*/
router.post("/create", Auth.optional, async (req, res, next) => {
  await RaclettePartyController.create(req, res, next);
});
//Get the info about s RacletteParty
router.get("/:id", Auth.optional, async (req, res, next) => {
  await RaclettePartyController.show(req, res, next);
});
/**
 * Deletes a Raclette Party
 */
router.delete("/:id", Auth.optional, async (req, res, next) => {
  await RaclettePartyController.delete(req, res, next);
});
/**
 * Adding guests to a raclette party
 */
router.put("/addGuests/:id", Auth.optional, async (req, res, next) => {
  await RaclettePartyController.addGuests(req, res, next);
});

module.exports = router;
