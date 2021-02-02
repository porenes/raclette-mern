const router = require("express").Router();
const ConnoisseurController = require("../controllers/connoisseur.controllers");
const Auth = require("../middlewares/Auth");
const RaclettePassport = require("../config/passport");

/**
 * LIST all Connoisseurs
 */
router.get("/", Auth.optional, async (req, res, next) => {
  await ConnoisseurController.list(req, res, next);
});
/**
 * Find Connoisseurs by list of ids
 */
router.post("/byIds", Auth.optional, async (req, res, next) => {
  await ConnoisseurController.byIds(req, res, next);
});
/**
 * Create a new Connoisseur
 */
router.post("/create", Auth.optional, async (req, res, next) => {
  await ConnoisseurController.create(req, res, next);
});
/**
 * Returns the logged in Connoisseur information
 */
router.get("/me", Auth.required, async (req, res, next) => {
  await ConnoisseurController.me(req, res, next);
});
/**
 * Returns the logged in Connoisseur uid
 */
router.get("/uid", Auth.required, async (req, res, next) => {
  await ConnoisseurController.uid(req, res, next);
});
/**
 * Returns a Connoisseur information
 */
router.get("/:id", Auth.optional, async (req, res, next) => {
  await ConnoisseurController.show(req, res, next);
});
/**
 * Request a Connoisseur for friendship
 */
router.patch("/woo/:id", Auth.required, async (req, res, next) => {
  await ConnoisseurController.woo(req, res, next);
});
/**
 * Accept a Connoisseur's friendship request
 */
router.patch("/accept/:id", Auth.required, async (req, res, next) => {
  await ConnoisseurController.accept(req, res, next);
});

/**
 * Deletes a connoisseur
 */
router.delete("/:id", Auth.required, async (req, res, next) => {
  await ConnoisseurController.delete(req, res, next);
});
/**
 * Registers a new Connoisseur
 */
router.post("/register", Auth.optional, async (req, res, next) => {
  await ConnoisseurController.register(req, res, next);
});

/**
 * LOGIN route
 */
router.post("/login", Auth.optional, async (req, res, next) => {
  await ConnoisseurController.login(req, res, next);
});

module.exports = router;
