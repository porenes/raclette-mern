const ReviewService = require("../services/review.service");

module.exports = {
  create: async (req, res, next) => {
    let { review } = req.body;
    !review && res.status(400).json({ message: "you need to post a review" });
    review.reviewer = req.user.id;
    if (!review.productId || !review.reviewer)
      res
        .status(400)
        .json({ message: "You cannot post without a product or a reviewer" });
    try {
      const newReview = await ReviewService.create(review);
      res.status(201).json(newReview);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  read: async (req, res, next) => {
    const { id } = req.params;
    if (!id) res.status(404).message("Nothing here");
    try {
      const review = await ReviewService.read(id);
      review
        ? res.status(200).json(review)
        : res.status(404).json({ message: `There is no rewiew with id ${id}` });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    if (!id) res.status(422).message("Id is required");
    try {
      res.status(200).json(await ReviewService.delete(id));
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
};
