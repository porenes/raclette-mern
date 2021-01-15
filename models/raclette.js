const mongoose = require('mongoose');
const racletteSchema = mongoose.Schema({
    owner: { type: String, required: true },
    status: { type: Boolean, required: false }
});
module.exports = mongoose.model('Raclette', racletteSchema);