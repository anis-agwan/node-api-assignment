const express = require("express");
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/db");
const user = require("./routes/user");
const shopkeeper  = require("./routes/shopkeeper")

InitiateMongoServer(); 

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/user", user);
app.use("/vendor", shopkeeper)

app.listen(PORT, (req, res) => {
  console.log(`Server Started, Listening at PORT ${PORT}`);
});