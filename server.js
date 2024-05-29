const express = require("express");
const app = express();
const db = require("./db");
//const person = require("./models/Person");
const MenuItem = require("./models/MenuItem");

const bodyParser = require("body-parser");
const Person = require("./models/Person");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Wlelcome to my hotel...How can i help you ?");
});

// POST route to add a person
app.post("/person", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    // Save the new person to the database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET method to get the person data
app.get("/person", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data found");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST method to add a Menu Item
app.post("/menu", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GEt method to get the Menu Items
app.get("/menu", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/person/:workType', async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type form the URL parameter
    if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
      const response = await Person.find({work: workType});
      console.log('response fetched');
      res.status(200).json(response);
    } else {
      res.status(404).json({error: 'Invalid work type'});
    }
  } catch {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})


app.listen(3000, () => {
  console.log("listening on port 3000");
});
