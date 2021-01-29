const Post = require("../models/post");
module.exports = {
  /**
   * Create a new post
   */
  create: async (postDTO) => {
    return await Post.create(postDTO);
  },

  /**
   * List all posts
   */
  list: async () => {
    return await Post.find();
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
