const express = require("express")
const bodyParser = require('body-parser')

// Define app
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.json("J'aime la raclette 🧀");
})
require("./config/db.js")()

const racletteRoute = require("./routes/racletteParty")
app.use('/party', racletteRoute)
const connoisseurRoute = require("./routes/connoisseur")
app.use('/connoisseur', connoisseurRoute)

//Defin and start server
const port = 7374;
app.listen(port, () => console.log(`🧀 Cheese ! I'm started on http://localhost:${port}`));