const router = require("express").Router();
const ConnoisseurController = require("../controllers/connoisseur.controllers");
const auth = require("./auth.routes");

/**
 * LIST all Connoisseurs
 */
router.get("/", auth.required, async (req, res,next) => {
  await ConnoisseurController.list(req, res,next);
});
/**
 * Create a new Connoisseur
 */
router.post("/create", auth.optional, async (req, res, next) => {
  await ConnoisseurController.create(req, res, next);
});
/**
 * Returns a Connoisseur information
 */
router.get("/:id", auth.optional, async (req, res, next) => {
  await ConnoisseurController.show(req, res, next)
});
/**
 * Deletes a connoisseur
 */
router.delete("/:id", auth.optional, async (req, res, next) => {
  await ConnoisseurController.delete(req, res, next)
});
/**
 * Registers a new Connoisseur
 */
router.post("/register", auth.optional, async (req, res, next) => {
  await ConnoisseurController.register(req, res, next)
});

/**
 * LOGIN route
 */
router.post('/login', auth.optional, async (req, res, next) => {
  await ConnoisseurController.login(req, res, next)
});


module.exports = router;
