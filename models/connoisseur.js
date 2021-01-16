const { mongo } = require("mongoose");
const mongoose = require('mongoose')
const connoisseurSchema = mongoose.Schema({
    name: {type: String, required: true, index: true, unique: true},
    cheeseLoveRate: {type: Number, min:0, max:5, default : 3},
    meatEater: {type: Boolean, default: true}
})
module.exports = mongoose.model('Connoisseur', connoisseurSchema);