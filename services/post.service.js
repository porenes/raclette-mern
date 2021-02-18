const Post = require("../models/post");
module.exports = {
  /**
   * Create a new post
   */
  create: async (postDTO) => {
    return await Post.create(postDTO);
  },

  /**
   * Gets a list of posts
   *
   * @param {String} beforeId Id of the post to start from @default null (the latest)
   * @param {Number} num Number of posts to get @default null (all)
   */
  list: async (beforeId = null, num = null) => {
    try {
      if (beforeId) {
        const lastPost = await Post.findById(beforeId);
        if (num) {
          return await Post.find({
            createdAt: { $lt: lastPost.createdAt },
          })
            .sort("-createdAt")
            .limit(num);
        } else
          return await Post.find({
            createdAt: { $lt: lastPost.createdAt },
          }).sort("-createdAt");
      } else {
        return num
          ? Post.find().sort("-createdAt").limit(num)
          : Post.find().sort("-createdAt");
      }
    } catch (error) {
      console.error("🤦🏻‍♂️ error getting list of posts for {}, {}", beforeId, num);
      console.error(error);
      throw error
    }
  },

  /**
   * Returns a post, based on the id provided
   * @param {String} id Id of the post
   */
  show: async (id) => {
    return await Post.findById(id);
  },

  /**
   * Deletes a post, base on its ID
   * @param {String} id Id of the post to delete
   */
  delete: async (id) => {
    return await Post.findByIdAndDelete(id);
  },

  like: async (id, likerId) => {
    // TODO check liker exists
    try {
      const post = await Post.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            likers: likerId,
          },
        },
        { new: true }
      );

      return post;
    } catch (error) {
      //TODO improve error
      console.error("🤦🏻‍♂️ Error liking post : " + error);
      throw error;
    }
  },
  unlike: async (id, likerId) => {
    // TODO check liker exists
    try {
      const post = await Post.findByIdAndUpdate(
        id,
        {
          $pull: {
            likers: likerId,
          },
        },
        { new: true }
      );
      return post;
    } catch (error) {
      //TODO improve error
      console.error("🤦🏻‍♂️ Error unliking post : " + error);
      throw error;
    }
  },
};
