const mongoose = require("mongoose");
require("./connoisseur");
const ReviewSchema = mongoose.Schema(
  {
    productId: { type: String },
    priceRate: { type: Number },
    tasteRate: { type: Number },
    tasteComment: { type: String },
    textureRate: { type: Number },
    textureComment: { type: String },
    totalComment: { type: String },
    totalRate: { type: Number },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "Connoisseur" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
