const mongoose = require("mongoose");

require("./connoisseur");
const raclettePartySchema = mongoose.Schema(
  {
    host: { type: String, required: true },
    date: { type: Date, required: true },
    guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Connoisseur" }],
    seats: Number,
    isPrivate: Boolean,
  },
  { timestamps: true }
);
module.exports = mongoose.model("RacletteParty", raclettePartySchema);
