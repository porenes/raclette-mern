const router = require("express").Router();
const ProductsController = require("../controllers/products.controller");
const Auth = require("../middlewares/Auth");

/**List all available posts */
router.get("/raclettes", Auth.optional, async (req, res, next) => {
  await ProductsController.listPopularRaclettes(req, res, next);
});

module.exports = router;
