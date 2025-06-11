const { Restaurant, validateResDetails } = require("../models/Restaurant");
const { Cuisine } = require('../models/Cuisine');

exports.getAllRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find();
  if (!restaurants) return res.status(404).send("No restaurant exist");
  res.send(restaurants);
};

exports.getRestaurantById = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) return res.status(404).send("Restaurant not found");
  res.send(restaurant);
};

exports.createRestaurant = async (req, res) => {
  const { error } = validateResDetails(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const cuisineIDs = new Set();
  const cuisineNames = req.body.cuisine;

  for (let cuisineName of cuisineNames) {
    let existing = await Cuisine.findOne({ name: cuisineName });
    if (existing) {
      cuisineIDs.add(existing._id);
    } else {
      let cuisine = await Cuisine.create({
        name: cuisineName,
      });
      cuisineIDs.add(cuisine._id);
    }
  }

  const restaurant = await Restaurant.create({
    name: req.body.name,
    address: req.body.address,
    owner: req.user._id,
    cuisine: Array.from(cuisineIDs),
  });
  res.send(restaurant);
};

exports.updateRestaurant = async (req, res) => {
  let restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) return res.status(404).send("No restaurant found");

  const { error } = validateResDetails(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const cuisineIDs = new Set();
  const cuisineNames = req.body.cuisine;

  for (let cuisineName of cuisineNames) {
    let existing = await Cuisine.findOne({ name: cuisineName });
    if (existing) {
      cuisineIDs.add(existing._id);
    } else {
      let cuisine = await Cuisine.create({
        name: cuisineName,
      });
      cuisineIDs.add(cuisine._id);
    }
  }

  restaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      address: req.body.address,
      cuisine: Array.from(cuisineIDs),
    },
    {
      new: true,
    }
  );
};

exports.deleteRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
  if (!restaurant) return res.status(404).send("No restaurant found");
  res.send(restaurant);
};

exports.toggleResOpening = async (req, res) => {
  let restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) return res.status(404).send("No restaurant found");

  restaurant.isOpen = !restaurant.isOpen;
  await restaurant.save();
  res.json({ message: "toggled isOpen", isOpen: restaurant.isOpen })
};
