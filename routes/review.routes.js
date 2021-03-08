const router = require("express").Router();
const ReviewController = require("../controllers/review.controllers");
const Auth = require("../middlewares/Auth");

/**List all available review */
router.get("/product/:productId", Auth.optional, async (req, res, next) => {
  await ReviewController.listProduct(req, res, next);
});
/**  Create a review
 */
router.post("/create", Auth.required, async (req, res, next) => {
  await ReviewController.create(req, res, next);
});
/**
 * Get the info about a review
 * */
router.get("/:id", Auth.optional, async (req, res, next) => {
  await ReviewController.read(req, res, next);
});
/**
 * Deletes a review
 */
router.delete("/:id", Auth.required, async (req, res, next) => {
  await ReviewController.delete(req, res, next);
});

module.exports = router;
