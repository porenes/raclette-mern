const router = require("express").Router();
const ConnoisseurController = require("../controllers/connoisseur.controllers");

/**List all available raclettes */
router.get("/", async (req, res) => {
  await ConnoisseurController.list(req, res);
});
/* Create a raclette device, defining its owner
    Returns the URL to get its status
*/
router.post("/create", async (req, res) => {
    await ConnoisseurController.create(req, res)
});
//Get the status of a Raclette device
router.get("/:name", async (req, res) => {
  res.json("todo");
});

module.exports = router;
