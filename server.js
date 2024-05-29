const express = require("express");
const app = express();
const db = require("./db");
const menuItemRoutes = require("./routes/menuItemRoutes");
const personRoutes = require("./routes/personRoutes"); // Import the router files
require("dotenv").config();
const passport = require("./auth");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next(); // Move on to the next phase
};
app.use(logRequest);


const localAuthMiddleware = passport.authenticate('local', {session: false})

// USe the routers
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);
app.use(passport.initialize());

app.get("/", function(req, res) {
  res.send("Wlelcome to my hotel...How can i help you ?");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
