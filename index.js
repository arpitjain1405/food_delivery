const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost/food_delivery")
  .then(() => console.log("Connecting to database"))
  .catch((err) => console.error("Cound not connect to mongodb", err));

app.listen(3000, () => console.log("Listening to PORT 3000"));
