const mongoose = require("mongoose");

const CheeseSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Connoisseur", CheeseSchema);
