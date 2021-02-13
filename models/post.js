const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
      //TODO Check how to create a stronger validation
    authorId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      minlength:140,
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", PostSchema);
