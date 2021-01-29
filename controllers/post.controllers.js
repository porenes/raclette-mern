const PostService = require("../services/post.service");

module.exports = {
  list: async (req, res, next) => {
    try {
      res.status(200).json(await PostService.list());
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  create: async (req, res, next) => {
    let { post } = req.body;
    // * We get the user id from auth, not from the payload
    post.authorId = req.user.id
    if (!post.message || !post.authorId)
      res
        .status(400)
        .json({ message: "You cannot post without a message or a messenger" });
    try {
      const newPost = await PostService.create(post);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  show: async (req, res, next) => {
    const id = req.params.id;
    if (!id) res.status(404).message("Nothing here");
    try {
      res.status(200).json(await PostService.show(id));
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  delete: async (req, res, next) => {
    // TODO add some security to check who is deleting
    const id = req.params.id;
    if (!id) res.status(422).message("Id is required");
    try {
      await PostService.delete(id)
      res.status(204).send()
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  like: async (req, res, next) => {
    const id = req.params.id;
    const likerId = req.user.id;
    if (!id)
      res
        .status(400)
        .json({
          message: "No post to like",
        });
    if (!likerId)
      res.status(400).json({ message: "No liker" });
    try {
      res.status(200).json(await PostService.like(id, likerId));
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
  unlike: async (req, res, next) => {
    const id = req.params.id;
    const likerId = req.user.id;
    if (!id)
      res
        .status(400)
        .json({
          message: "No post to unlike",
        });
    if (!likerId)
      res.status(400).json({ message: "No liker for unlike" });
    try {
      res.status(200).json(await PostService.unlike(id, likerId));
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },
};
