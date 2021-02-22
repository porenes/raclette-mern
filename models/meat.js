const mongoose = require("mongoose");

const MeatSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meat", MeatSchema);
