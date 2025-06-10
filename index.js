const express = require("express");
const mongoose = require("mongoose");
const restaurantRoutes = require('./routes/restaurantRoutes');
const authRoutes = require('./routes/authRoutes');
const cuisineRoutes = require('./routes/cuisineRoutes');

const app = express();

app.use(express.json());
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/auths', authRoutes);
app.use('/api/cuisines', cuisineRoutes);

mongoose
  .connect("mongodb://localhost/food_delivery")
  .then(() => console.log("Connecting to database"))
  .catch((err) => console.error("Cound not connect to mongodb", err));

app.listen(3000, () => console.log("Listening to PORT 3000"));
