const router = require("express").Router();
const PostController = require("../controllers/post.controllers");
const Auth = require("../middlewares/Auth");

/**List all available posts */
router.get("/", Auth.optional, async (req, res, next) => {
  await PostController.list(req, res, next);
});
/**  Create a post
*/
router.post("/create", Auth.required, async (req, res, next) => {
  await PostController.create(req, res, next);
});
//Get the info about a Post
router.get("/:id", Auth.optional, async (req, res, next) => {
  await PostController.show(req, res, next);
});
/**
 * Deletes a post
 */
router.delete("/:id", Auth.required, async (req, res, next) => {
  await PostController.delete(req, res, next);
});
/**
 * Liking a post
 */
router.put("/like/:id", Auth.required, async (req, res, next) => {
  await PostController.like(req, res, next);
});
/**
 * Unliking a post
 */
router.put("/unlike/:id", Auth.required, async (req, res, next) => {
  await PostController.unlike(req, res, next);
});

module.exports = router;
