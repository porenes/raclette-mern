const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    productId: { type: String, unique: true },
    priceRate: { type: Number },
    tasteRate: { type: Number },
    tasteComment: { type: String },
    textureRate: { type: Number },
    textureComment: { type: String },
    totalComment: { type: String },
    totalRate: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
