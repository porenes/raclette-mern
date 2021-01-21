const router = require("express").Router();
const ConnoisseurController = require("../controllers/connoisseur.controllers");
const auth = require("./auth.routes");


router.get("/", auth.required, async (req, res,next) => {
  await ConnoisseurController.list(req, res,next);
});

router.post("/create", async (req, res) => {
  await ConnoisseurController.create(req, res);
});

router.get("/:name", async (req, res) => {
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
