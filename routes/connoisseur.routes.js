const router = require("express").Router();
const ConnoisseurController = require("../controllers/connoisseur.controllers");
const auth = require("./auth.routes");


router.get("/", auth.required, async (req, res,next) => {
  await ConnoisseurController.list(req, res,next);
});

router.post("/create", auth.optional, async (req, res, next) => {
  await ConnoisseurController.create(req, res, next);
});

router.get("/:name", auth.optional, async (req, res, next) => {
  res.json("todo");
});

router.post("/register", auth.optional, async (req, res, next) => {
  await ConnoisseurController.register(req, res, next)
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, async (req, res, next) => {
  await ConnoisseurController.login(req, res, next)
});


module.exports = router;
