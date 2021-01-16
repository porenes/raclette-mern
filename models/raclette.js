const mongoose = require('mongoose');
const racletteSchema = mongoose.Schema({
    owner: { type: String, required: true },
    status: { type: Boolean, default: false },
    pax: {type: Number, default: 6, required: true},
    power: {type: Number, default : 1000}
});
module.exports = mongoose.model('Raclette', racletteSchema);