const mongoose = require("mongoose");
const Joi = require("joi");

exports.validateResDetails = function (resDetails) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    address: Joi.string().min(10).required(),
    cuisine: Joi.array().items(Joi.string().required().min(3).max(30)).required(),
  });

  return schema.validate(resDetails);
};

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
  address: {
    type: String,
    required: true,
    min: 10,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  cuisine: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  ],
  rating: {
    type: Number,
    default: 5
  },
  isOpen: {
    type: Boolean,
    required: true,
    default: true,
  },
});

exports.Restaurant = mongoose.model("Restaurant", restaurantSchema);
