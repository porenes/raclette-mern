const mongoose = require('mongoose');
const raclettePartySchema = mongoose.Schema({
    host: { type: String, required: true },
    date: { type: Date, required: true}
});
module.exports = mongoose.model('RacletteParty', raclettePartySchema);