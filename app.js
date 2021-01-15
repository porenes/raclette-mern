const express = require("express")


// Define app
const app = express();

app.get("/", (req, res) => {
    res.json("J'aime la raclette 🧀");
})

require("./routes/raclette")(app)


//Defin and start server
const port = 7374;
app.listen(port, () => console.log(`🧀 Cheese ! I'm started on http://localhost:${port}`));