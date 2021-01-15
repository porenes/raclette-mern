const router = require('express').Router();
const RacletteService = require("../services/raclette")

module.exports = (app) => {
    app.get("/status", (req, res) => {
        res.json(RacletteService.status());
    })
    app.get("/on", (req, res) => {
        res.json(RacletteService.turnOn());
    })
    app.get("/off", (req, res) => {
        res.json(RacletteService.turnOff());
    })
}