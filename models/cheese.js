const mongoose = require("mongoose");

const CheeseSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    productId: { type: String, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cheese", CheeseSchema);
