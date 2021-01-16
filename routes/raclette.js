const router = require('express').Router();
const raclette = require('../models/raclette');
const RacletteService = require("../services/raclette")

module.exports = (app) => {
    /* Create a raclette device, defining its owner
        Returns the URL to get its status
    */
    app.post("/create", async (req, res) => {
        const newRaclette = await RacletteService.create(req.body.name)
        res.json("http://localhost:7374/status/"+newRaclette._id)
    })
    //Get the status of a Raclette device
    app.get("/status/:id", async (req, res) => {
        res.json(await RacletteService.status(req.params.id));
    })
    app.get("/on/:id", async (req, res) => {
        res.json(await RacletteService.turnOn(req.params.id));
    })
    app.get("/off/:id", async (req, res) => {
        res.json(await RacletteService.turnOff(req.params.id));
    })
}