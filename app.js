const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let war = [
    { name: 'gobza', points: 3000 },
    { name: 'gobsa', points: 22005 },
];

app.get("/", (req, res) => {
    res.send("GOBSA IS THE ULTIMATE CHAMPION AND GOBZA IS THE ULTIMATE NOOB HAHAHAHAHAHA");
});

// C
app.post('/war', (req, res) => {
    let newPerson = { id: war.length + 1, name: req.body.name, points: 0};
    war.push(newPerson);
    res.status(201).json(newPerson);
})

// R
app.get("/war", (req, res) => {
    res.json(war);
});

app.get("/war/:name", (req, res) => {
    try {
        let requestedName = req.params.name;
        let matchingPoints = war.find((person) => person.name.toLowerCase() === requestedName.toLowerCase());
        if(!matchingPoints) { throw new Error(`We don't have a person called ${requestedName}!`)}
        res.json(matchingPoints)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
})


// U
app.patch('/war/:name', (req, res) => {
    // read new data from body
    let newData = req.body
    // find the data to update - go through the list and match name value to value of dynamic route param of :name
    let requestedName = req.params.name;
    let matchingPerson = war.find((person) => person.name.toLowerCase() === requestedName.toLowerCase());
    
    // actually update the stored cats data
    let updatedPerson = { ...matchingPerson, ...newData }
    let personIdx = war.indexOf(matchingPerson)
    war = [ ...war.slice(0, personIdx), updatedPerson , ...war.slice(personIdx + 1)]
    
    res.json(updatedPerson)
})


// D
app.delete("/war", (req, res) => {
    war = [];
    res.status(204).send("Points gone");
})

module.exports = app;
