const { Cuisine, validateCuisine } = require("../models/Cuisine");

exports.getAllCuisines = async (req, res) => {
  const cuisines = await Cuisine.find();
  if (!cuisines) return res.status(404).send("No cuisine exist");
  res.send(cuisines);
};

exports.getCuisineById = async (req, res) => {
  const cuisine = await Cuisine.findById(req.params.id);
  if (!cuisine) return res.status(404).send("Cuisine not found");
  res.send(cuisine);
};

exports.createCuisine = async (req, res) => {
  const { error } = validateCuisine(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let cuisine = await Cuisine.findOne({ name: req.body.name });
  if(cuisine) return res.status(400).send("Cuisine already exist");

  cuisine = await Cuisine.create({
    name: req.body.name,
  });
  res.status(201).send(cuisine);
};

exports.updateCuisine = async (req, res) => {
  let cuisine = await Cuisine.findById(req.params.id);
  if (!cuisine) return res.status(404).send("Cuisine not found");

  const error = validateCuisine(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  cuisine = await Cuisine.findOne({ name: req.body.name });
  if(cuisine) return res.status(400).send("Cuisine already exist");

  cuisine = await Cuisine.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
    },
    {
      new: true,
    }
  );
  res.send(cuisine);
};

exports.deleteCuisine = async (req, res) => {
  const cuisine = await Cuisine.findByIdAndDelete(req.params.id);
  if (!cuisine) return res.status(404).send("Cuisine not found");
  res.send(cuisine);
};
